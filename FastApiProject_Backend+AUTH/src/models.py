import uuid
from sqlalchemy import Column, String, Boolean, Integer, Float, JSON, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from src.database import Base
from sqlalchemy.orm import relationship
class User(Base):
    __tablename__ = "users"

    user_id = Column(UUID(as_uuid=True), primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    first_name = Column(String)
    last_name = Column(String)
    hashed_password = Column(String)
    disabled = Column(Boolean, default=False)

    transactions = relationship("Transaction", back_populates="user")
    wallets = relationship("Wallet", back_populates="user")
    portfolios = relationship("Portfolio", back_populates="user")

class Cryptocurrency(Base):
    __tablename__ = "cryptocurrencies"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    symbol = Column(String, index=True)
    slug = Column(String, index=True)
    num_markey_pairs = Column(Integer, nullable=True)
    date_added = Column(String, nullable=True)
    tags = Column(JSON, nullable=True)
    max_supply = Column(Float, nullable=True)
    circulating_supply = Column(Float, nullable=True)
    total_supply = Column(Float, nullable=True)
    cmc_rank = Column(Integer)
    quote = Column(JSON)

    transactions = relationship("Transaction", back_populates="cryptocurrency")
    wallets = relationship("Wallet", back_populates="cryptocurrency")
    assets = relationship("Asset", back_populates="cryptocurrency")

class Transaction(Base):
    __tablename__ = "transactions"

    transaction_id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    amount = Column(Float, nullable=False)
    timestamp = Column(String, nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey('users.user_id'))
    cryptocurrency_id = Column(Integer, ForeignKey('cryptocurrencies.id'))
    # Relationships
    user = relationship("User", back_populates="transactions")
    cryptocurrency = relationship("Cryptocurrency", back_populates="transactions")

class Wallet(Base):
    __tablename__ = "wallets"

    wallet_id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    balance = Column(Float, nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey('users.user_id'))
    cryptocurrency_id = Column(Integer, ForeignKey('cryptocurrencies.id'))
    # Relationships
    user = relationship("User", back_populates="wallets")
    cryptocurrency = relationship("Cryptocurrency", back_populates="wallets")

class Portfolio(Base):
    __tablename__ = "portfolios"

    portfolio_id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey('users.user_id'))
    # Relationships
    user = relationship("User", back_populates="portfolios")
    assets = relationship("Asset", back_populates="portfolio")

class Asset(Base):
    __tablename__ = "assets"

    asset_id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    quantity = Column(Float, nullable=False)
    portfolio_id = Column(UUID(as_uuid=True), ForeignKey('portfolios.portfolio_id'))
    cryptocurrency_id = Column(Integer, ForeignKey('cryptocurrencies.id'))
    # Relationships
    portfolio = relationship("Portfolio", back_populates="assets")
    cryptocurrency = relationship("Cryptocurrency", back_populates="assets")