import { Card } from 'antd';

function CryptocurrencyCard({ currency }) {

  if (!currency || !currency.quote || !currency.quote.USD) {
    return <div>Loading...</div>;
  }

  const { name, id } = currency;
  const { price, percent_change_24h, market_cap } = currency.quote.USD;

  const formattedPrice = price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const formattedMarketCap = market_cap.toLocaleString(undefined, { maximumFractionDigits: 0 });

  const percentChangeColor = percent_change_24h >= 0 ? 'green' : 'red';

  return (
    <>
      <Card
          title={
              <div className='flex items-center gap-3'>
                  <img 
                    src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${id}.png`}
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                   />
                  <span>{name}</span>
              </div>
          }
          style={{
              width: 300,
          }}
      >
          <p>Текущая цена: ${formattedPrice}</p>
          <p>Изменение цены за 24 часа: <span style={{ color: percentChangeColor }}>{percent_change_24h.toFixed(2)}%</span></p>
          <p>Текущая капитализация: ${formattedMarketCap}</p>
      </Card>
    </>
  );
}

export default CryptocurrencyCard;
