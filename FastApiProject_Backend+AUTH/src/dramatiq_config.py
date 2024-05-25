import dramatiq
from dramatiq.brokers.redis import RedisBroker
from src.config import settings

redis_broker = RedisBroker(url=settings.REDIS_URL)
dramatiq.set_broker(redis_broker)
