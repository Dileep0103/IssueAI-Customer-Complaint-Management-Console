from app.auth.jwt_handler import (
    create_access_token,
    verify_token,
)

token = create_access_token(
    {
        "sub": "admin"
    }
)

print("JWT Token:\n")
print(token)

print("\nDecoded:\n")
print(
    verify_token(token)
)
