import ReflectiveCard from '@/components/ReflectiveCard';

export default function HeroCard() {
  return (
    <div style={{ height: '600px', position: 'relative' }}>
      <ReflectiveCard
        overlayColor="rgba(0, 0, 0, 0.2)"
        blurStrength={5}
        glassDistortion={30}
        metalness={0.8}
        roughness={0.5}
        displacementStrength={1}
        noiseScale={5}
        specularConstant={0}
        grayscale={0.8}
        color="#fbfffe"
        videoSrc="/videos/hero-vid.mp4"
      />
    </div>
  );
}
