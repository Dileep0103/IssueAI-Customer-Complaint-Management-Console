from app.database.database import SessionLocal
from app.models.admin import Admin
from app.auth.password import hash_password

db = SessionLocal()

# Check if admin already exists
existing_admin = (
    db.query(Admin)
    .filter(Admin.username == "admin")
    .first()
)

if existing_admin:
    print("Admin already exists!")
else:
    admin = Admin(
        username="admin",
        email="admin@example.com",
        password=hash_password("admin123"),
    )

    db.add(admin)
    db.commit()

    print("Admin created successfully!")

db.close()
