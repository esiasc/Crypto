import React from "react";
import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import styled from "styled-components";

const Loader = styled.span`
    display: flex;
    margin-top: 100px;
    align-items: center;
    justify-content: center;
`;

const ChartDiv = styled.div`
    display: block;
    background-color: ${(props) => props.theme.buttonColor};
    padding: 10px 20px;
    border-radius: 10px;
    margin-bottom: 20px;
`;

interface ChartProps {
    coinId: string;
    isDark: boolean;
}

interface IHistorical {
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}

function Chart({coinId, isDark}: ChartProps) {
    const {isLoading, data} = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId),
    {refetchInterval: 10000,});
    return (
        <div>
            {isLoading ? (
                <Loader>"Loading..."</Loader>
            ) : (
                <ChartDiv>
                {/* <ApexChart 
                    type="line"
                    series={[
                        {
                            name: "Price",
                            data: data?.map(price => price.close),
                        },
                    ]} 
                    options={{
                        theme: { mode: "dark" },
                        chart: {
                            height: 500,
                            width: 500,
                            toolbar: {
                                show: false,
                            },
                            background: "transparent",
                        },
                        grid: { show: false, },
                        stroke: {
                            curve: "smooth",
                            width: 4,
                        },
                        yaxis: { show: false, },
                        xaxis: {
                            labels: { show: false, },
                            axisBorder: { show: false, },
                            axisTicks: { show: false, },
                            type: "datetime",
                            categories: data?.map(price => price.time_close),
                        },
                        fill: {
                            type: "gradient", 
                            gradient: { gradientToColors: ["#feca57"], stops: [0, 100], },
                        },
                        colors: ["#ff6b6b"],
                        tooltip: {
                            y: { formatter: (value) => `$ ${value.toFixed(2)}`, },
                        },
                    }} 
                /> */}

                    <ApexChart 
                    type="candlestick"
                    series={[
                        {
                            data: data?.map((price) => {
                                return {
                                    x: price.time_close,
                                    y: [price.open.toFixed(2), price.high.toFixed(2), price.low.toFixed(2), price.close.toFixed(2)],
                                }
                            })
                        }
                    ]}
                    options={{
                        theme: { mode: isDark ? "dark" : "light" },
                        chart: {
                            height: 500,
                            width: 500,
                            toolbar: { show: false, },
                            background: "transparent",
                        },
                        stroke: {
                            width: 1,
                        },
                        grid: { show: false, },
                        yaxis: { show: false, },
                        xaxis: {
                            labels: { show: false, },
                            axisBorder: { show: false, },
                            axisTicks: { show: false, },
                            type: "datetime",
                            categories: data?.map(price => price.time_close),
                        },
                        
                    }} 
                
                    />
                </ChartDiv>
            )}
        </div>
    );
}

export default Chart;