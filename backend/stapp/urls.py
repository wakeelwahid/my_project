from django.urls import path
from .views import *



urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', MobileLoginView.as_view(), name='login'),
    path('profile/', user_profile, name='user-profile'),
    path('balance/', wallet_balance, name='wallet-balance'),
    path('deposit/', deposit_request, name='deposit-request'),
    path('withdraw/', withdraw_request, name='withdraw-request'),
    path('transactions/', transaction_history, name='transaction-history'),
    path('place-bet/', place_bet, name='place-bet'),
    path('view-bets-24h/', view_bets_24h, name='view-bets-24h'),
    path('view-bets-30d/', view_bets_30d, name='view-bets-30d'),
    path('my-bets/', user_bet_history, name='user-bet-history'),



    # 🏁 Admin Result Declaration
    path('admin/declare-result/', declare_result, name='declare-result'),

    # 🧾 User Bet History
   

    # 💸 Referral Earnings History
    path('my-referrals/', referral_earnings, name='referral-earnings'),

    # 📊 Admin Game Stats
    path('admin/game-stats/', game_stats, name='admin-game-stats'),



]
