import { useMemo } from "react";

const StarRating = ({ fillPercentage = 0, color }) => {
	const clipPathStyle = useMemo(
		() => ({
			clipPath: `inset(0 calc(100% - ${fillPercentage}%) 0 0)`,
		}),
		[fillPercentage]
	);

	return (
		<div style={{ position: "relative", display: "inline-block", width: "2rem", height: "2rem" }}>
			<svg
				width="32px"
				height="32px"
				viewBox="0 0 24 24"
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					color: "transparent",
					width: "100%",
					height: "100%",
					marginRight: "0",
				}}>
				<path
					fill="none"
					stroke={color}
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="1"
					d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.12 2.12 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16z"
				/>
			</svg>
			<svg
				width="32px"
				height="32px"
				viewBox="0 0 24 24"
				style={{
					position: "absolute",
					top: "1px",
					left: "1px",
					width: "calc(100% - 2px)",
					height: "calc(100% - 2px)",
					fill: { color },
					marginRight: "0",
					overflow: "hidden",
					...clipPathStyle,
				}}>
				<path
					stroke="none"
					fill={color}
					d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.12 2.12 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16z"
				/>
			</svg>
		</div>
	);
};

export default StarRating;
