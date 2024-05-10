from src.init import cmc_client
from fastapi import APIRouter, Depends
from src.auth import get_current_active_user, User
from pydantic import BaseModel, Field
from typing import List, Optional

class Quote(BaseModel):
    price: float
    volume_24h: float = Field(..., alias='volume_24h')
    percent_change_1h: float = Field(..., alias='percent_change_1h')
    percent_change_24h: float = Field(..., alias='percent_change_24h')
    market_cap: float = Field(..., alias='market_cap')

class CurrencyQuote(BaseModel):
    USD: Quote

class Cryptocurrency(BaseModel):
    id: int
    name: str
    symbol: str
    slug: Optional[str]
    num_market_pairs: Optional[int]
    date_added: Optional[str]
    tags: List[str] = []
    max_supply: Optional[float]
    circulating_supply: Optional[float]
    total_supply: Optional[float]
    cmc_rank: int
    quote: CurrencyQuote

router = APIRouter(prefix='/cryptocurrencies')

@router.get('', response_model=List[Cryptocurrency])
async def get_cryptocurrencies(current_user: User = Depends(get_current_active_user)):
    raw_data = await cmc_client.get_listings()

    return raw_data

@router.get('/{currency_id}', response_model=dict)
async def get_cryptocurrency(currency_id: int, current_user: User = Depends(get_current_active_user)):
    currency = await cmc_client.get_currency(currency_id)
    return currency