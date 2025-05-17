from django.contrib import admin, messages
from django.utils import timezone
from decimal import Decimal
from .models import *

admin.site.register(User)

@admin.register(Wallet)
class WalletAdmin(admin.ModelAdmin):
    list_display = ('user', 'balance', 'bonus', 'winnings')

@admin.register(DepositRequest)
class DepositRequestAdmin(admin.ModelAdmin):
    list_display = ('user', 'amount', 'utr_number', 'is_approved', 'is_rejected', 'created_at', 'approved_at')
    actions = ['approve_deposit', 'reject_deposit']

    def approve_deposit(self, request, queryset):
        count = 0
        for deposit in queryset.filter(is_approved=False, is_rejected=False):
            wallet, _ = Wallet.objects.get_or_create(user=deposit.user)
            wallet.balance += Decimal(deposit.amount)
            wallet.save()

            deposit.is_approved = True
            deposit.approved_at = timezone.now()
            deposit.save()

            Transaction.objects.create(
                user=deposit.user,
                transaction_type='deposit',
                amount=deposit.amount,
                status='success',
                note=f"Deposit approved (UTR: {deposit.utr_number})"
            )
            count += 1
        self.message_user(request, f"✅ {count} deposit(s) approved.")

    def reject_deposit(self, request, queryset):
        count = 0
        for deposit in queryset.filter(is_approved=False, is_rejected=False):
            deposit.is_rejected = True
            deposit.save()
            Transaction.objects.create(
                user=deposit.user,
                transaction_type='deposit',
                amount=deposit.amount,
                status='rejected',
                note=f"Deposit rejected (UTR: {deposit.utr_number})"
            )
            count += 1
        self.message_user(request, f"❌ {count} deposit(s) rejected.")
    
    approve_deposit.short_description = "✅ Approve selected deposit requests"
    reject_deposit.short_description = "❌ Reject selected deposit requests"

@admin.register(WithdrawRequest)
class WithdrawRequestAdmin(admin.ModelAdmin):
    list_display = ('user', 'amount', 'is_approved', 'is_rejected', 'created_at', 'approved_at')
    actions = ['approve_withdrawal', 'reject_withdrawal']

    def approve_withdrawal(self, request, queryset):
        count = 0
        for withdraw in queryset.filter(is_approved=False, is_rejected=False):
            wallet = Wallet.objects.get(user=withdraw.user)
            if wallet.balance >= withdraw.amount:
                wallet.balance -= Decimal(withdraw.amount)
                wallet.save()

                withdraw.is_approved = True
                withdraw.approved_at = timezone.now()
                withdraw.save()

                Transaction.objects.create(
                    user=withdraw.user,
                    transaction_type='withdraw',
                    amount=withdraw.amount,
                    status='success',
                    note="Withdrawal approved"
                )
                count += 1
            else:
                self.message_user(request, f"⚠️ {withdraw.user.username} has insufficient balance.")
        self.message_user(request, f"✅ {count} withdrawal(s) approved.")

    def reject_withdrawal(self, request, queryset):
        count = 0
        for withdraw in queryset.filter(is_approved=False, is_rejected=False):
            withdraw.is_rejected = True
            withdraw.save()

            Transaction.objects.create(
                user=withdraw.user,
                transaction_type='withdraw',
                amount=withdraw.amount,
                status='rejected',
                note="Withdrawal rejected"
            )
            count += 1
        self.message_user(request, f"❌ {count} withdrawal(s) rejected.")
    
    approve_withdrawal.short_description = "✅ Approve selected withdrawal requests"
    reject_withdrawal.short_description = "❌ Reject selected withdrawal requests"



# admin.py
from django.contrib import admin
from .models import Transaction

class TransactionAdmin(admin.ModelAdmin):
    list_display = ('user', 'transaction_type', 'amount', 'status', 'created_at')
    list_filter = ('status', 'transaction_type')
    actions = ['approve_transaction', 'reject_transaction']

    def approve_transaction(self, request, queryset):
        queryset.update(status='approved')
        for transaction in queryset:
            # Additional logic like updating user balance or other fields
            pass
    approve_transaction.short_description = "Approve selected transactions"

    def reject_transaction(self, request, queryset):
        queryset.update(status='rejected')
        for transaction in queryset:
            # Additional logic like notifying the user or logging a reason for rejection
            pass
    reject_transaction.short_description = "Reject selected transactions"

admin.site.register(Transaction, TransactionAdmin)


@admin.register(Bet)
class BetAdmin(admin.ModelAdmin):
    list_display = ('user', 'game', 'bet_type', 'number', 'amount', 'is_win', 'payout', 'created_at')

@admin.register(ReferralCommission)
class ReferralCommissionAdmin(admin.ModelAdmin):
    list_display = ('referrer', 'referred_user', 'commission', 'created_at')

