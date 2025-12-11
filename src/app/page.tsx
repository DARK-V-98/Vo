'use client';
import FloatingHearts from "@/components/FloatingHearts";
import Hero from "@/components/Hero";
import DailyAffirmation from "@/components/DailyAffirmation";
import LoveMessage from "@/components/LoveMessage";
import LoveQuotes from "@/components/LoveQuotes";
import SendLove from "@/components/SendLove";
import LoveCalculator from "@/components/LoveCalculator";
import ReasonsILoveYou from "@/components/ReasonsILoveYou";
import Gallery from "@/components/Gallery";
import MoodTracker from "@/components/MoodTracker";
import BucketList from "@/components/BucketList";
import LovePlaylist from "@/components/LovePlaylist";
import SecretMessages from "@/components/SecretMessages";
import SpecialDates from "@/components/SpecialDates";
import Milestones from "@/components/Milestones";
import Footer from "@/components/Footer";
import SharedJournal from "@/components/SharedJournal";

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <FloatingHearts />
      <main className="relative z-10">
        <Hero />
        <DailyAffirmation />
        <LoveMessage />
        <SharedJournal />
        <LoveQuotes />
        <SendLove />
        <LoveCalculator />
        <ReasonsILoveYou />
        <MoodTracker />
        <Gallery />
        <BucketList />
        <LovePlaylist />
        <SecretMessages />
        <SpecialDates />
        <Milestones />
        <Footer />
      </main>
    </div>
  );
};

export default Index;
