import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchCoins } from '../api';
import { Helmet } from 'react-helmet';

const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
    background-color: ${(props) => props.theme.buttonColor};
    color: ${(props) => props.theme.buttonTextColor};
    border-radius: 15px;
    margin-bottom: 10px;
    a {
        display: flex;
        align-items: center;
        padding: 20px;
        transition: color 0.2s ease-in;
    }
    &:hover {
        a {
            color: ${(props) => props.theme.accentColor};
        }
    }
`;

const Title = styled.h1`
    font-size: 48px;
    color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
    text-align: center;
    display: block;
    margin-top: 100px;
    font-size: 25px;
`;

const Img = styled.img`
    width: 35px;
    height: 35px;
    margin-right: 10px;
`;

const Button = styled.button`
  padding: 4px;
  border-radius: 6px;
  border-color: transparent;
  background-color: ${(props) => props.theme.buttonColor};
  color: ${(props) => props.theme.buttonTextColor};
  transition: color 0.2s ease-in;
  &:hover {
            color: ${(props) => props.theme.accentColor};
    }
`;

interface ICoin {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}

interface ICoinsProps {
    toggleDark: () => void;
}

function Coins({ toggleDark }: ICoinsProps) {
    const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
    /* const [coins, setCoins] = useState<CoinInterface[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        (async() => {
            
            setCoins(json.slice(0, 100));
            setLoading(false);
        })();
    }, []); */
    return (
        <Container>
            <Helmet>
                <title>COINS</title>
            </Helmet>
            <Header>
                <Title>COINS</Title>
                <Button onClick={toggleDark}>Mode</Button>
            </Header>
            {isLoading ? (
                <Loader>"Loading..."</Loader>
             ) : (
                <CoinsList>
                    {data?.slice(0, 100).map((coin) => (
                        <Coin key={coin.id}>
                            <Link to={{
                                pathname:`/${coin.id}`,
                                state: { name:coin.name },
                            }}>
                                <Img src={`http://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
                                {coin.name} &rarr;
                            </Link>
                        </Coin>
                    ))}
                </CoinsList>
            )}
        </Container>
    );
}

export default Coins;