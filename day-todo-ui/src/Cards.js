

const Cards = ({ data }) => {


    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const todaystroke = data.todoCount > 0 ? circumference - (data.donePercent / 100) * circumference : 251.32741228718345
    const weekstroke = data.todoCount > 0 ? circumference - (data.dueCount / data.todoCount) * circumference : 251.32741228718345

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
                        {data.donePercent ? data.donePercent : 0}%
                    </text>
                </svg>
                <p style={{ fontWeight: "bold" }}>TODAY</p>
            </div>
            <div style={{ textAlign: 'center'}}>
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
                        stroke="red"
                        strokeWidth="8"
                        strokeDasharray={circumference}
                        strokeDashoffset={weekstroke}
                    />
                    <text x="50%" y="50%" textAnchor="middle" fill="#333" fontSize="20px">
                        {data.dueCount ? data.dueCount : 0}
                    </text>
                </svg>
                <p style={{ fontWeight: "bold" }}>Tasks Past Due</p>
            </div>
        </div>

    );
};

export default Cards