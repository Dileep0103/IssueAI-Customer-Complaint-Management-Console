from app.auth.password import (
    hash_password,
    verify_password,
)

password = "admin123"

hashed = hash_password(password)

print("Original Password:")
print(password)

print("\nHashed Password:")
print(hashed)

print("\nPassword Match:")
print(
    verify_password(
        "admin123",
        hashed
    )
)
