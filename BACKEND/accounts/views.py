from django.shortcuts import render

# Create your views here.
from django.contrib.auth.models import User
from django.views import View
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import json

@method_decorator(csrf_exempt, name='dispatch')
class SignupView(View):
    def post(self, request):
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)

        username = data.get("username")
        email = data.get("email")
        password = data.get("password")

        # 🛑 Check for missing or empty fields
        if not username or not email or not password:
            return JsonResponse({"error": "All fields (username, email, password) are required"}, status=400)

        # 🔁 Check if username is already taken
        if User.objects.filter(username=username).exists():
            return JsonResponse({"error": "Username already taken"}, status=400)

        # ✅ Create the user
        User.objects.create_user(username=username, email=email, password=password)
        return JsonResponse({"message": "User created successfully!"})


@method_decorator(csrf_exempt, name='dispatch')
class LoginView(View):
    def post(self, request):
        data = json.loads(request.body)
        username = data.get("username")
        password = data.get("password")

        from django.contrib.auth import authenticate
        user = authenticate(username=username, password=password)

        if user is not None:
            return JsonResponse({"message": "Login successful!"})
        else:
            return JsonResponse({"error": "Invalid credentials"}, status=401)

