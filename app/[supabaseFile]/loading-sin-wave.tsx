const Box = ({
  delay,
  from = "purple",
  via = "green",
}: {
  delay: number;
  from: string;
  via: string;
}) => (
  <div
    key={delay}
    className={`w-1 h-12 bg-gradient-to-t from-${from}-500 to-transparent via-${via}-400 transform transition-transform duration-1000 ease-in-out origin-bottom`}
    style={{
      animation: `sinWave 1s ease-in-out infinite ${delay}s`,
    }}
  >
    &nbsp;
  </div>
);

const LoadingSinWave = ({
  from = "purple",
  via = "green",
}: {
  from: string;
  via: string;
}) => (
  <div key={"hello"} className=" flex justify-around">
    {Array.from({ length: 100 }, (_, index) => (
      <Box key={index} delay={index * 0.02} from={from} via={via} />
    ))}
  </div>
);

export default LoadingSinWave;
