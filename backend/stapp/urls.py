from django.urls import path
from .views import *



urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', MobileLoginView.as_view(), name='login'),
    path('balance/', wallet_balance, name='wallet-balance'),
    path('deposit/', deposit_request, name='deposit-request'),
    path('withdraw/', withdraw_request, name='withdraw-request'),
    path('transactions/', transaction_history, name='transaction-history'),
    path('bet/', place_bet, name='place-bet'),
    # urls_result_apis.py – Routes for result, bet history, referral, stats



    # 🏁 Admin Result Declaration
    path('admin/declare-result/', declare_result, name='declare-result'),

    # 🧾 User Bet History
    path('my-bets/', user_bet_history, name='user-bet-history'),

    # 💸 Referral Earnings History
    path('my-referrals/', referral_earnings, name='referral-earnings'),

    # 📊 Admin Game Stats
    path('admin/game-stats/', game_stats, name='admin-game-stats'),



]
