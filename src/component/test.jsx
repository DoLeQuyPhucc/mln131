import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  Menu,
  Book,
  Users,
  Target,
  Lightbulb,
  Building2,
  GraduationCap,
  Briefcase,
  Factory,
  ArrowRight,
  Plus,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import heroImage from "../assets/thumbnail.jpg";

const InteractiveCard = ({ icon: Icon, title, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      layout
      onClick={() => setIsExpanded(!isExpanded)}
      className="bg-white/10 backdrop-blur-md rounded-xl p-6 cursor-pointer 
        border border-white/20 hover:border-white/40 transition-all w-full"
    >
      <motion.div layout className="flex items-center gap-3 mb-4">
        <div className="p-3 bg-white/20 rounded-full">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-white font-vietnam">
          {title}
        </h3>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          className="ml-auto"
        >
          <Plus className="w-5 h-5 text-white" />
        </motion.div>
      </motion.div>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4 text-white/90 font-vietnam leading-relaxed overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const TableOfContents = ({ onNavigate }) => {
  const sections = [
    {
      title: "I. Quan điểm cơ bản của chủ nghĩa Mác-Lênin",
      subsections: [
        "1. Khái niệm giai cấp công nhân",
        "2. Đặc điểm cơ bản của giai cấp công nhân",
        "3. Sứ mệnh lịch sử thế giới",
      ],
    },
    {
      title: "II. Giai cấp công nhân hiện nay",
      subsections: [
        "1. Bối cảnh hiện nay",
        "2. Thách thức đối với giai cấp công nhân",
        "3. Vai trò của giai cấp công nhân",
      ],
    },
    {
      title: "III. Sứ mệnh lịch sử của giai cấp công nhân Việt Nam",
      subsections: [
        "1. Vai trò của giai cấp công nhân Việt Nam",
        "2. Thực hiện sứ mệnh lịch sử",
        "3. Giải pháp phát huy vai trò",
      ],
    },
    {
      title: "IV. Bác sĩ, giảng viên, IT và giai cấp công nhân",
      subsections: [
        "1. Góc nhìn Mác-Lênin",
        "2. Phân tích từng nghề",
        "3. Kết luận",
      ],
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="fixed left-4 top-20 bg-white/90 backdrop-blur-md p-6 rounded-lg shadow-xl w-80 z-40 max-h-[80vh] overflow-y-auto border border-gray-200"
    >
      <h3 className="text-xl font-bold mb-4 text-gray-800 font-vietnam">
        Mục lục
      </h3>
      <div className="space-y-4">
        {sections.map((section, idx) => (
          <div key={idx} className="space-y-2">
            <button
              onClick={() => onNavigate(section.title)}
              className="text-left font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-300 font-vietnam"
            >
              {section.title}
            </button>
            {section.subsections.map((sub, subIdx) => (
              <button
                key={subIdx}
                onClick={() => onNavigate(sub)}
                className="block ml-4 text-sm text-gray-600 hover:text-blue-600 transition-colors duration-300 font-vietnam"
              >
                {sub}
              </button>
            ))}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const FullscreenSection = ({ id, title, bgImage, children }) => (
  <section
    id={id}
    className="relative h-screen w-full flex items-center justify-center snap-center overflow-hidden"
  >
    {/* Background Image với fade effect */}
    <div
      className="absolute inset-0 z-0 transition-opacity duration-500"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/50" />
    </div>

    {/* Scrollable Content Container */}
    <div className="relative z-10 container mx-auto px-8 h-full overflow-y-auto scrollbar-hide">
      <div className="py-24">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl font-playfair font-bold mb-16 text-center text-white"
        >
          {title}
        </motion.h2>
        <div className="text-white">{children}</div>
      </div>
    </div>
  </section>
);

// Timeline Component cho Section 2
const Timeline = ({ items }) => {
  return (
    <div className="relative space-y-8">
      <div className="absolute left-9 top-0 bottom-0 w-0.5 bg-white/20" />
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.2 }}
          className="relative flex items-start gap-6"
        >
          <div className="absolute left-0 flex items-center justify-center w-20 h-20">
            <div className="w-4 h-4 bg-blue-500 rounded-full" />
          </div>
          <div className="ml-20">
            <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
            <p className="text-white/80">{item.content}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Carousel Component cho Section 3
const Carousel = ({ items }) => {
  const [active, setActive] = useState(0);

  return (
    <div className="relative overflow-hidden rounded-xl">
      <div className="flex space-x-4">
        {items.map((item, index) => (
          <motion.div
            key={index}
            animate={{
              scale: active === index ? 1 : 0.9,
              opacity: active === index ? 1 : 0.5,
            }}
            onClick={() => setActive(index)}
            className="flex-shrink-0 w-full cursor-pointer"
          >
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-white mb-4">
                {item.title}
              </h3>
              <p className="text-white/80">{item.content}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Question Card Component cho Section 4
const QuestionCard = ({ question, explanation }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      layout
      className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
    >
      <motion.div
        className="flex items-start gap-4 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="p-3 bg-white/20 rounded-full mt-1">
          <GraduationCap className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">{question}</h3>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-white/80 space-y-4"
              >
                {explanation}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <motion.div animate={{ rotate: isOpen ? 45 : 0 }} className="ml-auto">
          <Plus className="w-5 h-5 text-white" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// Interactive Timeline Component
const InteractiveTimeline = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative">
      {/* Timeline Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-white/20 transform -translate-x-1/2" />

      {/* Timeline Items */}
      <div className="relative space-y-24">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className={`flex items-center gap-8 ${
              index % 2 === 0 ? "flex-row" : "flex-row-reverse"
            }`}
          >
            {/* Content */}
            <motion.div
              initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              className="w-1/2 bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20
                hover:bg-white/20 transition-all cursor-pointer"
              onClick={() => setActiveIndex(index)}
            >
              <h3 className="text-xl font-bold text-white mb-4">
                {item.title}
              </h3>
              <p className="text-white/80">{item.content}</p>
            </motion.div>

            {/* Timeline Node */}
            <div className="relative">
              <motion.div
                animate={{
                  scale: activeIndex === index ? 1.2 : 1,
                  backgroundColor:
                    activeIndex === index ? "#60A5FA" : "#ffffff33",
                }}
                className="w-6 h-6 rounded-full bg-white/20 relative z-10"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Interactive Feature Card
const FeatureCard = ({ icon: Icon, title, content, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group"
    >
      <div
        className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl 
        blur-xl transition-opacity opacity-0 group-hover:opacity-100"
      />

      <div
        className="relative bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20
        hover:border-white/40 transition-all"
      >
        <motion.div
          animate={{
            rotateY: isHovered ? 180 : 0,
            opacity: isHovered ? 0 : 1,
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="p-4 bg-white/20 rounded-full">
            <Icon className="w-8 h-8 text-white" />
          </div>
        </motion.div>

        <motion.div
          animate={{
            rotateY: isHovered ? 0 : -180,
            opacity: isHovered ? 1 : 0,
          }}
          className="space-y-4"
        >
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <p className="text-white/80">{content}</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Section Components
const Section1 = () => (
  <FullscreenSection
    id="section1"
    title="I. Quan điểm cơ bản của chủ nghĩa Mác-Lênin"
    bgImage="https://images.unsplash.com/photo-1447069387593-a5de0862481e"
  >
    <div className="grid grid-cols-1 gap-6 max-w-3xl mx-auto">
      <InteractiveCard icon={Book} title="Khái niệm giai cấp công nhân">
        <p>
          Giai cấp công nhân là giai cấp trực tiếp tham gia vào quá trình sản
          xuất công nghiệp hiện đại, không sở hữu tư liệu sản xuất và phải bán
          sức lao động để sống.
        </p>
        <p>
          Theo C. Mác và Ph. Ăng-ghen, họ là lực lượng đại diện cho phương thức
          sản xuất tiên tiến, có khả năng xóa bỏ chế độ tư hữu và xây dựng xã
          hội mới.
        </p>
      </InteractiveCard>

      <InteractiveCard icon={Users} title="Đặc điểm cơ bản">
        <p>
          Về vị trí kinh tế - xã hội: Là sản phẩm của nền sản xuất công nghiệp
          hiện đại, gắn liền với sự phát triển của lực lượng sản xuất.
        </p>
        <p>
          Về tư tưởng: Đại diện cho lợi ích của toàn thể nhân loại lao động.
        </p>
        <p>Về tổ chức: Có tính tổ chức cao, kỷ luật nghiêm ngặt.</p>
      </InteractiveCard>

      <InteractiveCard icon={Target} title="Sứ mệnh lịch sử thế giới">
        <p>Lật đổ chế độ tư bản chủ nghĩa, xóa bỏ chế độ tư hữu tư bản.</p>
        <p>
          Xây dựng xã hội mới - xã hội xã hội chủ nghĩa và tiến tới cộng sản chủ
          nghĩa.
        </p>
        <p>Sứ mệnh này xuất phát từ đặc điểm của giai cấp công nhân.</p>
      </InteractiveCard>
    </div>
  </FullscreenSection>
);

const Section2 = () => (
  <FullscreenSection
    id="section2"
    title="II. Giai cấp công nhân hiện nay"
    bgImage="https://images.unsplash.com/photo-1590650153855-d9e808231d41"
  >
    <div className="max-w-6xl mx-auto">
      <InteractiveTimeline
        items={[
          {
            title: "Bối cảnh hiện nay",
            content:
              "Toàn cầu hóa và cách mạng công nghiệp 4.0 tạo biến đổi lớn trong cơ cấu kinh tế - xã hội. Mở rộng sang công nghiệp công nghệ cao, dịch vụ và tri thức.",
          },
          {
            title: "Thách thức",
            content:
              "Phân hóa giàu nghèo ngày càng sâu sắc. Phân tầng trong nội bộ giai cấp công nhân. Ảnh hưởng của tư tưởng tư sản.",
          },
          {
            title: "Vai trò mới",
            content:
              "Tiếp tục đấu tranh xóa bỏ chế độ tư bản và xây dựng XHCN. Làm chủ khoa học công nghệ, nâng cao năng lực sản xuất.",
          },
        ]}
      />
    </div>
  </FullscreenSection>
);

const CircularProgress = ({ value, label }) => (
  <div className="relative w-32 h-32">
    <svg className="w-full h-full" viewBox="0 0 100 100">
      <circle
        className="text-white/20 stroke-current"
        strokeWidth="8"
        fill="transparent"
        r="40"
        cx="50"
        cy="50"
      />
      <motion.circle
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: value }}
        className="text-blue-500 stroke-current"
        strokeWidth="8"
        strokeLinecap="round"
        fill="transparent"
        r="40"
        cx="50"
        cy="50"
        style={{ transformOrigin: "50% 50%", rotate: -90 }}
      />
    </svg>
    <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
      {label}
    </div>
  </div>
);

// Section 3 Component
const Section3 = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <FullscreenSection
      id="section3"
      title="III. Sứ mệnh lịch sử của giai cấp công nhân Việt Nam"
      bgImage="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
    >
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Progress Indicators */}
        <div className="grid grid-cols-3 gap-8 justify-items-center">
          <CircularProgress value={0.75} label="Tiên phong" />
          <CircularProgress value={0.85} label="Đổi mới" />
          <CircularProgress value={0.95} label="Phát triển" />
        </div>

        {/* Interactive Tabs */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <div className="flex gap-4 mb-6">
            {["Vai trò", "Thách thức", "Giải pháp"].map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-6 py-2 rounded-full transition-all ${
                  activeTab === index
                    ? "bg-blue-500 text-white"
                    : "bg-white/10 text-white/60 hover:bg-white/20"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {activeTab === 0 && (
                <div className="grid md:grid-cols-2 gap-6">
                  <FeatureCard
                    icon={GraduationCap}
                    title="Lực lượng tiên phong"
                    content="Trong giải phóng dân tộc và xây dựng XHCN"
                    index={0}
                  />
                  <FeatureCard
                    icon={Building2}
                    title="Nòng cốt đổi mới"
                    content="Trong công nghiệp hóa, hiện đại hóa đất nước"
                    index={1}
                  />
                </div>
              )}
              {activeTab === 1 && (
                <div className="grid md:grid-cols-2 gap-6">
                  <FeatureCard
                    icon={Target}
                    title="Hội nhập quốc tế"
                    content="Đối mặt với thách thức của toàn cầu hóa"
                    index={0}
                  />
                  <FeatureCard
                    icon={Lightbulb}
                    title="Cách mạng 4.0"
                    content="Thích ứng với công nghệ và tri thức mới"
                    index={1}
                  />
                </div>
              )}
              {activeTab === 2 && (
                <div className="grid md:grid-cols-3 gap-6">
                  <FeatureCard
                    icon={Book}
                    title="Đào tạo"
                    content="Nâng cao chất lượng đào tạo và giáo dục"
                    index={0}
                  />
                  <FeatureCard
                    icon={Users}
                    title="Đời sống"
                    content="Cải thiện điều kiện và quyền lợi"
                    index={1}
                  />
                  <FeatureCard
                    icon={Target}
                    title="Lãnh đạo"
                    content="Tăng cường sự lãnh đạo của Đảng"
                    index={2}
                  />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </FullscreenSection>
  );
};

const Section4 = () => (
  <FullscreenSection
    id="section4"
    title="Câu hỏi thảo luận"
    bgImage="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
  >
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-xl text-white/90 text-center mb-12"
      >
        Từ những phân tích trên, chúng ta cùng suy ngẫm về câu hỏi:
      </motion.p>

      <QuestionCard
        question="Bác sĩ, giảng viên đại học, kỹ sư IT có thuộc giai cấp công nhân không?"
        explanation={
          <>
            <p className="mb-4">
              Để trả lời câu hỏi này, chúng ta cần phân tích dựa trên các tiêu
              chí:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li>Vị trí trong quan hệ sản xuất xã hội</li>
              <li>Vai trò trong tổ chức lao động xã hội</li>
              <li>Cách thức nhận phần phối thu nhập</li>
              <li>Trình độ chuyên môn và tính chất công việc</li>
            </ul>
            <p className="mb-4">
              Theo quan điểm của chủ nghĩa Mác-Lênin, những nghề này:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Không trực tiếp tham gia sản xuất vật chất</li>
              <li>Thuộc tầng lớp trí thức, lao động trí óc là chủ yếu</li>
              <li>Có vị trí đặc thù trong cơ cấu xã hội</li>
            </ul>
            <p className="mt-4">
              Do đó, họ không hoàn toàn thuộc giai cấp công nhân theo định nghĩa
              truyền thống, mà thuộc tầng lớp trí thức trong cơ cấu xã hội hiện
              đại.
            </p>
          </>
        }
      />

      <div className="mt-12 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-white/80 italic"
        >
          Hãy suy ngẫm và thảo luận về câu hỏi này dựa trên những kiến thức đã
          học về giai cấp công nhân và thực tế xã hội hiện nay.
        </motion.p>
      </div>
    </div>
  </FullscreenSection>
);

const HistoricalMissionPage = () => {
  return (
    <div
      className="h-screen w-full overflow-y-auto snap-y snap-mandatory scroll-smooth"
      style={{
        scrollbarWidth: "none", // Firefox
        msOverflowStyle: "none", // IE
        WebkitOverflowScrolling: "touch",
      }}
    >
      {/* Thêm styles cho scrollbar */}
      <style jsx global>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        ::-webkit-scrollbar {
          display: none;
        }

        /* Hide scrollbar for IE, Edge and Firefox */
        body {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }

        /* Optional: Custom scrollbar styles if you want to show it */
        /*
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 3px;
        }
        */
      `}</style>

      {/* Navigation Dots */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 space-y-4">
        {["hero", "section1", "section2", "section3", "section4"].map(
          (sectionId, index) => (
            <a
              key={sectionId}
              href={`#${sectionId}`}
              className="block w-3 h-3 rounded-full bg-white/50 hover:bg-white/90 transition-colors duration-200"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(sectionId)?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
            />
          )
        )}
      </div>

      {/* Hero Section */}
      <FullscreenSection
        id="hero"
        title="Sứ Mệnh Lịch Sử của Giai Cấp Công Nhân"
        bgImage={heroImage}
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative z-10 text-center max-w-5xl mx-auto px-4"
        >
          <h1
            className="text-5xl md:text-7xl font-bold mb-6 text-white 
                         tracking-wider leading-tight
                         drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)]
                         bg-gradient-to-r from-white to-gray-300 bg-clip-text"
          >
            Sứ Mệnh Lịch Sử của Giai Cấp Công Nhân
          </h1>

          <p
            className="text-2xl md:text-3xl mb-12 text-gray-200 
                       font-light tracking-wide leading-relaxed
                       drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]"
          >
            Hành trình phát triển và vai trò quan trọng trong xã hội hiện đại
          </p>

          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <ChevronDown
              className="w-12 h-12 mx-auto animate-bounce 
                                  text-white cursor-pointer 
                                  drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]"
            />
          </motion.div>
        </motion.div>
      </FullscreenSection>

      {/* Section 1 */}
      <Section1 />

      {/* Section 2 */}
      <Section2 />

      <Section3 />
      <Section4 />
    </div>
  );
};

export default HistoricalMissionPage;
