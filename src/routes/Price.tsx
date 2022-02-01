import React from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinTickers } from "../api";

const Container = styled.div`
    max-width: 480px;
    margin: 0 auto;
    margin-bottom: 20px;
`;

const Loader = styled.span`
    display: flex;
    margin-top: 100px;
    align-items: center;
    justify-content: center;
`;

const Overview = styled.div`
    display: block;
`;

const OverviewItem = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: ${(props) => props.theme.buttonColor};
    padding: 10px 20px;
    border-radius: 10px;
    margin-bottom: 20px;
    justify-content: space-between;
    span:first-child {
        font-size: 10px;
        font-weight: 400;
        text-transform: uppercase;
    }
`;

interface PriceProps {
    coinId: string;
}

interface IPrice {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
        USD: {
            ath_date: string;
            ath_price: number;
            market_cap: number;
            market_cap_change_24h: number;
            percent_change_1h: number;
            percent_change_1y: number;
            percent_change_6h: number;
            percent_change_7d: number;
            percent_change_12h: number;
            percent_change_15m: number;
            percent_change_24h: number;
            percent_change_30d: number;
            percent_change_30m: number;
            percent_from_price_ath: number;
            price: number;
            volume_24h: number;
            volume_24h_change_24h: number;
        }
    };
}

function Price({coinId}: PriceProps) {
    const { isLoading, data } = useQuery<IPrice>(["Price", coinId], () => fetchCoinTickers(coinId), {refetchInterval: 5000,});
    return (
        <Container>
            { isLoading ? (
                <Loader>"Loading..."</Loader>
             ) : (
                <Overview>
                    <OverviewItem>
                        <span>Current Price:</span>
                        <span>${data?.quotes.USD.price.toFixed(3)}</span>
                    </OverviewItem>
                    <OverviewItem>
                        <span>Change Rate(24h):</span>
                        <span>{data?.quotes.USD.percent_change_24h}%</span>
                    </OverviewItem>
                     <OverviewItem>
                        <span>Market Cap:</span>
                        <span>${data?.quotes.USD.market_cap.toFixed(3)}</span>
                    </OverviewItem>
                    <OverviewItem>
                        <span>All Time High:</span>
                        <span>${data?.quotes.USD.ath_price.toFixed(3)}</span>
                    </OverviewItem>
                    <OverviewItem>
                        <span>All Time Date:</span>
                        <span>{data?.quotes.USD.ath_date}</span>
                    </OverviewItem>
                </Overview>
             )}
        </Container>
    );
}

export default Price;