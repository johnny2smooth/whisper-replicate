const Box = ({ delay, fromVia }: { delay: number; fromVia: string }) => (
  <div
    key={delay}
    className={`bg-gradient-to-t ${fromVia} to-transparent w-1 h-12  transform transition-transform duration-1000 ease-in-out origin-bottom`}
    style={{
      animation: `sinWave 1s ease-in-out infinite ${delay}s`,
    }}
  >
    &nbsp;
  </div>
);

const LoadingSinWave = ({ fromVia }: { fromVia: string }) => (
  <div key={"hello"} className="flex justify-around">
    {Array.from({ length: 100 }, (_, index) => (
      <Box key={index} delay={index * 0.02} fromVia={fromVia} />
    ))}
  </div>
);

export default LoadingSinWave;
