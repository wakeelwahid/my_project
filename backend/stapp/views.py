from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView
from decimal import Decimal



from .serializers import RegisterSerializer, MobileTokenObtainPairSerializer
from .models import DepositRequest,Wallet,WithdrawRequest,Bet,Transaction


# --- Auth Views ---
class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]  # ✅ Anyone can register


class MobileLoginView(TokenObtainPairView):
    serializer_class = MobileTokenObtainPairSerializer


# --- Wallet Balance View ---
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def wallet_balance(request):
    wallet, _ = Wallet.objects.get_or_create(user=request.user)
    return Response({
        'balance': str(wallet.balance),
        'bonus': str(wallet.bonus),
        'winnings': str(wallet.winnings)
    })


# --- Deposit Request View ---
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def deposit_request(request):
    amount = request.data.get('amount')
    utr = request.data.get('utr_number')

    try:
        amount = float(amount)
    except (TypeError, ValueError):
        return Response({'error': 'Amount must be a valid number'}, status=400)

    if not utr or len(utr) < 8:
        return Response({'error': 'Invalid UTR number (min 8 chars)'}, status=400)

    DepositRequest.objects.create(user=request.user, amount=amount, utr_number=utr)
    return Response({'message': 'Deposit request submitted, pending admin approval'})


# --- Withdraw Request View ---
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def withdraw_request(request):
    amount = request.data.get('amount')

    try:
        amount = float(amount)
    except (TypeError, ValueError):
        return Response({'error': 'Amount must be a valid number'}, status=400)

    wallet = Wallet.objects.get(user=request.user)
    if wallet.balance < amount:
        return Response({'error': 'Insufficient balance'}, status=400)

    WithdrawRequest.objects.create(user=request.user, amount=amount)
    return Response({'message': 'Withdrawal request submitted, pending admin approval'})


# --- Transaction History View ---
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def transaction_history(request):
    transactions = Transaction.objects.filter(user=request.user).order_by('-created_at')
    return Response([{
        'type': tx.transaction_type,
        'amount': str(tx.amount),
        'status': tx.status,
        'date': tx.created_at,
        'note': tx.note
    } for tx in transactions])

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def place_bet(request):
    user = request.user
    game = request.data.get('game')
    bet_type = request.data.get('bet_type')
    number = int(request.data.get('number'))
    amount = Decimal(request.data.get('amount'))

    if bet_type == 'number' and not (1 <= number <= 100):
        return Response({'error': 'Number must be 1-100 for number bet'}, status=400)
    if bet_type in ['andar', 'bahar'] and not (0 <= number <= 9):
        return Response({'error': 'Number must be 0-9 for Andar/Bahar'}, status=400)

    wallet = Wallet.objects.get(user=user)
    if wallet.balance < amount:
        return Response({'error': 'Insufficient balance'}, status=400)

    wallet.balance -= amount
    wallet.save()

    bet = Bet.objects.create(
        user=user,
        game=game,
        bet_type=bet_type,
        number=number,
        amount=amount
    )

    return Response({'message': 'Bet placed successfully', 'bet_id': bet.id})


# ✅ Django Views for Result Declaration, Bet History, Referral Earnings, Admin Stats

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.utils import timezone
from decimal import Decimal
from .models import Bet, Wallet, ReferralCommission, User
from django.db.models import Sum, Count, Q

# 🏁 Admin Result Declaration API
@api_view(['POST'])
@permission_classes([IsAdminUser])
def declare_result(request):
    game = request.data.get('game')
    winning_number = int(request.data.get('winning_number'))

    if not game or winning_number is None:
        return Response({"error": "game and winning_number are required"}, status=400)

    today = timezone.now().date()
    bets = Bet.objects.filter(game=game, created_at__date=today)

    win_count = 0
    for bet in bets:
        if bet.number == winning_number:
            bet.is_win = True
            win_amount = Decimal(0)

            if game == 'gurgaon':
                win_amount = bet.amount * Decimal(100 if bet.bet_type == 'number' else 10)
            else:
                if bet.bet_type == 'number':
                    win_amount = bet.amount * Decimal('0.91')
                elif bet.bet_type in ['andar', 'bahar']:
                    win_amount = bet.amount * Decimal(9)

            bet.payout = win_amount
            bet.save()

            wallet = Wallet.objects.get(user=bet.user)
            wallet.winnings += win_amount
            wallet.save()

            # 💸 Referral Bonus (only on non-Gurgaon number wins)
            if game != 'gurgaon' and bet.bet_type == 'number' and bet.user.referred_by:
                try:
                    referrer = User.objects.get(referral_code=bet.user.referred_by)
                    commission = win_amount * Decimal('0.01')
                    ref_wallet = Wallet.objects.get(user=referrer)
                    ref_wallet.bonus += commission
                    ref_wallet.save()

                    ReferralCommission.objects.create(
                        referred_user=bet.user,
                        referrer=referrer,
                        bet=bet,
                        commission=commission
                    )
                except User.DoesNotExist:
                    pass

            win_count += 1

    return Response({"message": f"✅ Result declared. Total winning bets: {win_count}"})


# 🧾 User Bet History API
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_bet_history(request):
    bets = Bet.objects.filter(user=request.user).order_by('-created_at')
    data = [
        {
            "game": b.game,
            "bet_type": b.bet_type,
            "number": b.number,
            "amount": str(b.amount),
            "is_win": b.is_win,
            "payout": str(b.payout),
            "date": b.created_at
        } for b in bets
    ]
    return Response(data)


# 💸 Referral Earnings API
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def referral_earnings(request):
    commissions = ReferralCommission.objects.filter(referrer=request.user).order_by('-created_at')
    total_earned = commissions.aggregate(total=Sum('commission'))['total'] or 0

    data = {
        "total_commission": str(total_earned),
        "records": [
            {
                "referred_user": rc.referred_user.username,
                "amount": str(rc.commission),
                "bet_game": rc.bet.game,
                "date": rc.created_at
            } for rc in commissions
        ]
    }
    return Response(data)


# 📊 Admin Game Stats API
@api_view(['GET'])
@permission_classes([IsAdminUser])
def game_stats(request):
    today = timezone.now().date()
    stats = Bet.objects.filter(created_at__date=today).values('game', 'bet_type', 'number').annotate(
        total_amount=Sum('amount'),
        total_bets=Count('id')
    ).order_by('game', 'bet_type', 'number')

    return Response(list(stats))
