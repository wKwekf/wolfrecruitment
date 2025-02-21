'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    name: 'Wolf-Daniel\nGonzalez Garcia',
    role: 'Geschäftsführer & Recruiter',
    image: '/photos/team/daniel.png',
  },
  {
    name: 'Stefan\nRuf',
    role: 'Partner & Recruiter',
    image: '/photos/team/stefan.png',
  },
  {
    name: 'Vitus\nMeixl',
    role: 'Recruiter',
    image: '/photos/team/vitus.png',
  },
  {
    name: 'Lilly\nOstendorf',
    role: 'Marketing',
    image: '/photos/team/lilly.png',
  },
];

export default function TeamSection() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-platform mb-6 text-black">
            Das Team hinter Wolf
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Mit Leidenschaft und Expertise spüren wir die besten AI-Talente auf. 
            Unser scharfer Blick findet genau die Experten, die dein Team auf das nächste Level bringen.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="h-full"
            >
              <div className="bg-[#121118] rounded-2xl p-6 flex flex-col items-center h-full">
                <div className="relative w-48 h-48 mb-6">
                  <div className="absolute inset-0 bg-[#FF3366] rounded-full -z-10 translate-x-4 translate-y-4" />
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <h3 className="text-2xl text-white mb-2 text-center whitespace-pre-line min-h-[4rem]">{member.name}</h3>
                <div className="flex flex-col items-center mt-auto">
                  <span className="text-white text-center">{member.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 