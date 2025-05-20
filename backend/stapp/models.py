from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings

class User(AbstractUser):
    mobile = models.CharField(max_length=10, unique=True)
    email = models.EmailField(blank=True, null=True)
    referral_code = models.CharField(max_length=20, blank=True, null=True)
    referred_by = models.CharField(max_length=20, blank=True, null=True)

    USERNAME_FIELD = 'mobile'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.username

class Wallet(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    balance = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    bonus = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    winnings = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    def __str__(self):
        return f"{self.user.username} Wallet"

class DepositRequest(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    utr_number = models.CharField(max_length=20)
    is_approved = models.BooleanField(default=False)
    is_rejected = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    approved_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.user.username} Deposit ₹{self.amount}"

class WithdrawRequest(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    is_approved = models.BooleanField(default=False)
    is_rejected = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    approved_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.user.username} Withdraw ₹{self.amount}"



# models.py
class Transaction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    transaction_type = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(
        max_length=20, choices=[('pending', 'Pending'), ('approved', 'Approved'), ('rejected', 'Rejected')], default='pending'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    note = models.CharField(max_length=255, null=True, blank=True)



    def __str__(self):
        return f"{self.user.username} - {self.transaction_type} - {self.amount} - {self.status}"


from django.db import models
from django.contrib.auth import get_user_model
from decimal import Decimal

User = get_user_model()

class Bet(models.Model):
    GAME_CHOICES = [
        ('gali', 'Gali'),
        ('faridabad', 'Faridabad'),
        ('disawer', 'Disawer'),
        ('ghaziabad', 'Ghaziabad'),
        ('gurgaon', 'Gurgaon'),
    ]
    BET_TYPE_CHOICES = [
        ('number', 'Number'),
        ('andar', 'Andar'),
        ('bahar', 'Bahar'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    game = models.CharField(max_length=20, choices=GAME_CHOICES)
    bet_type = models.CharField(max_length=10, choices=BET_TYPE_CHOICES)
    number = models.IntegerField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    is_win = models.BooleanField(default=False)
    payout = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.game} - {self.bet_type} - {self.number}"




class ReferralCommission(models.Model):
    referred_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='referred_bets')
    referrer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='earned_commissions')
    bet = models.ForeignKey(Bet, on_delete=models.CASCADE)
    commission = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
