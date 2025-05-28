import {PieChart,Pie,Cell,Tooltip,ResponsiveContainer,Legend} from "recharts";
import CustomTooltip from './CustomTooltip';
import CustomLegend from './CustomLegend';

const CustomPieChart = ({data,label,totalAmount,colors,showTextAnchor}) => {
    return (
        <div className="relative">
            <ResponsiveContainer width="100%" height={380}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="amount"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={130}
                        innerRadius={100}
                        labelLine={false}
                    >
                        {data.map((entry,index)=>(
                            <Cell key={`cell-${index}`} fill={colors[index%colors.length]}/>
                        ))}
                    </Pie>
                    <Tooltip content={CustomTooltip} position={{ x: 50, y: 50 }}/>
                    <Legend content={CustomLegend}/>
                </PieChart>
            </ResponsiveContainer>
            
            {showTextAnchor && (
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <div className="text-center">
                        <p className="text-sm text-gray-600 mb-1">{label}</p>
                        <p className="text-2xl font-semibold text-gray-900">{totalAmount}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CustomPieChart;