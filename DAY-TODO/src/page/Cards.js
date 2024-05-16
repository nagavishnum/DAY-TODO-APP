import { useCallback, useEffect, useState } from "react";

const Cards = ({ data ,date}) => {
    const [percent, setpercent] = useState({
        todaypercent: '',
        weekpercent: '',
        monthpercent: ''
    });

    const filterPercentages = useCallback(async () => {
        const percentage = data?.percent;
       
        const currentdatepercent = percentage && await percentage?.filter((x) => x.date == date);
        const weekpercent = percentage && await percentage?.map((x) => x.percentage);
  
        const sum = weekpercent && weekpercent?.reduce((acc, currentValue) => acc + currentValue, 0);
        const averageweek = sum / weekpercent.length;
        const value = currentdatepercent[0]?.percentage;
        setpercent((x) => ({ ...x, todaypercent: Math.round(value ?value: 0), weekpercent: Math.round(averageweek ?averageweek: 0) }));
    }, [data]);

    useEffect(() => {
        filterPercentages();
    }, [filterPercentages]);

    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const todaystroke = circumference - (percent?.todaypercent / 100) * circumference;
    const weekstroke = circumference - (percent?.weekpercent / 100) * circumference;

    return (
        <div style={{ display: "flex", justifyContent: "space-evenly", gap: "10px" }}>
            <div style={{ textAlign: 'center' }}>
                <svg width="120" height="120" viewBox="0 0 120 120">
                    <circle
                        cx="60"
                        cy="60"
                        r={radius}
                        fill="transparent"
                        stroke="#95a5a6"
                        strokeWidth="8"
                    />
                    <circle
                        cx="60"
                        cy="60"
                        r={radius}
                        fill="transparent"
                        stroke="#2ecc71"
                        strokeWidth="8"
                        strokeDasharray={circumference}
                        strokeDashoffset={todaystroke}
                    />
                    <text x="50%" y="50%" textAnchor="middle" fill="#333" fontSize="20px">
                        {percent?.todaypercent}%
                    </text>
                </svg>
                <p>TODAY</p>
            </div>
            <div style={{ textAlign: 'center' }}>
                <svg width="120" height="120" viewBox="0 0 120 120">
                    <circle
                        cx="60"
                        cy="60"
                        r={radius}
                        fill="transparent"
                        stroke="#95a5a6"
                        strokeWidth="8"
                    />
                    <circle
                        cx="60"
                        cy="60"
                        r={radius}
                        fill="transparent"
                        stroke="#2ecc71"
                        strokeWidth="8"
                        strokeDasharray={circumference}
                        strokeDashoffset={weekstroke}
                    />
                    <text x="50%" y="50%" textAnchor="middle" fill="#333" fontSize="20px">
                        {percent?.weekpercent ?? "NA"}%
                    </text>
                </svg>
                <p>AVG COMPLETION</p>
            </div>
        </div>

    );
};

export default Cards