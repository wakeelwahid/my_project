from rest_framework import serializers

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
print(TokenObtainPairSerializer)


from django.contrib.auth import get_user_model

from .models import Wallet, DepositRequest, Bet


User = get_user_model()


# ✅ Registration Serializer
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'mobile', 'email', 'password', 'confirm_password', 'referral_code']

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match.")
        return data

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()

        Wallet.objects.create(user=user)  # ✅ auto wallet
        return user


# ✅ Custom Login with Mobile
class MobileTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = 'mobile'


# ✅ Wallet Serializer
class WalletSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wallet
        fields = ['balance', 'bonus', 'winnings']


# ✅ Deposit Request Serializer
class DepositRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = DepositRequest
        fields = ['id', 'user', 'amount', 'utr_number', 'payment_method', 'status', 'created_at']
        read_only_fields = ['user', 'status', 'created_at']


class BetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bet
        fields = ['id', 'user', 'game', 'bet_type', 'number', 'amount', 'is_win', 'payout', 'created_at']
        read_only_fields = ['user', 'is_win', 'payout', 'created_at']
