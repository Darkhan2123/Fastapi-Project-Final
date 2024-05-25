import dramatiq
import logging
import asyncio
from sqlalchemy.orm import Session
from src.http_client import CMCHTTPClient
from src.config import settings
from src.database import SessionLocal
from src.models import Cryptocurrency

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

async def fetch_and_store_cryptocurrency_details_async(currency_id: int):
    cmc_client = CMCHTTPClient(
        base_url='https://pro-api.coinmarketcap.com',
        api_key=settings.CMC_API_KEY
    )
    data = await cmc_client.get_currency(currency_id)
    await cmc_client.close()
    logger.info(f"Fetched details for cryptocurrency ID {currency_id}: {data}")

    # Store the data in the database
    db = SessionLocal()
    try:
        # Check if the cryptocurrency already exists
        existing_crypto = db.query(Cryptocurrency).filter(Cryptocurrency.id == data['id']).first()
        if existing_crypto:
            # Update existing cryptocurrency
            existing_crypto.name = data['name']
            existing_crypto.symbol = data['symbol']
            existing_crypto.slug = data['slug']
            existing_crypto.num_markey_pairs = data.get('num_market_pairs')
            existing_crypto.date_added = data.get('date_added')
            existing_crypto.tags = data.get('tags')
            existing_crypto.max_supply = data.get('max_supply')
            existing_crypto.circulating_supply = data.get('circulating_supply')
            existing_crypto.total_supply = data.get('total_supply')
            existing_crypto.cmc_rank = data['cmc_rank']
            existing_crypto.quote = data['quote']
        else:
            # Create a new cryptocurrency record
            new_crypto = Cryptocurrency(
                id=data['id'],
                name=data['name'],
                symbol=data['symbol'],
                slug=data['slug'],
                num_markey_pairs=data.get('num_market_pairs'),
                date_added=data.get('date_added'),
                tags=data.get('tags'),
                max_supply=data.get('max_supply'),
                circulating_supply=data.get('circulating_supply'),
                total_supply=data.get('total_supply'),
                cmc_rank=data['cmc_rank'],
                quote=data['quote']
            )
            db.add(new_crypto)
        db.commit()
    finally:
        db.close()

@dramatiq.actor
def fetch_and_store_cryptocurrency_details(currency_id: int):
    asyncio.run(fetch_and_store_cryptocurrency_details_async(currency_id))