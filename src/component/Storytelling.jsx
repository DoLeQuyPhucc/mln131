import React, { useState, useEffect } from "react";
import {
  Book,
  Users,
  Target,
  ArrowRight,
  Factory,
  Briefcase,
  Brain,
  Globe,
  Stethoscope,
  GraduationCap,
  Computer,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import section3 from "../assets/thumbnail.jpg";
import ChatbotAssistant from "./ChatbotAI";

const TimelineNav = ({ currentSection }) => {
  const sections = [
    { id: "hero", label: "Giới thiệu" },
    { id: "section1", label: "Quan điểm cơ bản" },
    { id: "section2", label: "Thực hiện sứ mệnh" },
    { id: "section3", label: "Sứ mệnh GCCN Việt Nam" },
    { id: "section4", label: "Thảo luận" },
    { id: "thanks", label: "Kết thúc" },
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40">
      <div className="flex flex-col items-center gap-4">
        {sections.map((section) => (
          <div
            key={section.id}
            className="group relative flex items-center"
            onClick={() => scrollToSection(section.id)}
          >
            <div
              className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
                currentSection === section.id
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/80"
              }`}
            />
            <div className="hidden group-hover:block absolute right-full mr-2">
              <span className="whitespace-nowrap bg-white/10 backdrop-blur-md text-white text-sm py-1 px-2 rounded">
                {section.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const StorySection = ({ children, bgImage, title, subtitle, id }) => (
  <section
    id={id}
    className="min-h-screen relative flex items-center justify-center overflow-hidden snap-start"
  >
    <div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
      style={{
        backgroundImage: `url(${bgImage})`,
        filter: "brightness(0.3)",
      }}
    />
    <div className="relative z-10 container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xl text-white/80 max-w-2xl mx-auto">{subtitle}</p>
        )}
      </motion.div>
      {children}
    </div>
  </section>
);

const FeatureCard = ({ icon: Icon, title, description }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    whileHover={{ y: -5 }}
    className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
  >
    <div className="flex items-center gap-4 mb-4">
      <div className="p-3 bg-white/20 rounded-full">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-xl font-semibold text-white">{title}</h3>
    </div>
    <p className="text-white/80 leading-relaxed">{description}</p>
  </motion.div>
);

const TimelineItem = ({ year, title, description, isRight, image }) => (
  <div className="relative w-full mb-16">
    <div className="md:flex items-center justify-between">
      {/* Image Section */}
      <motion.div
        initial={{ opacity: 0, x: isRight ? 30 : -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        className={`w-full md:w-[42%] ${isRight ? "md:order-2" : "md:order-1"}`}
      >
        <div className="relative h-64 md:h-80 rounded-xl overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      </motion.div>

      {/* Center Line and Dot Container */}
      <div className="hidden md:block relative w-[8%]">
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/20 -translate-x-1/2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full" />
      </div>

      {/* Content Section */}
      <motion.div
        initial={{ opacity: 0, x: isRight ? -30 : 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        className={`w-full md:w-[42%] ${isRight ? "md:order-1" : "md:order-2"}`}
      >
        <div
          className={`bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20`}
        >
          <div className="text-white/60 mb-2">{year}</div>
          <h3 className="text-2xl font-semibold text-white mb-3">{title}</h3>
          <p className="text-white/80 leading-relaxed">{description}</p>
        </div>
      </motion.div>
    </div>
  </div>
);

const StorytellingPage = () => {
  const [currentSection, setCurrentSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "hero",
        "section1",
        "section2",
        "section3",
        "section4",
        "thanks",
      ];

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-black min-h-screen snap-y snap-mandatory overflow-y-auto">
      <TimelineNav currentSection={currentSection} />
      {/* Hero Section */}
      <StorySection
        id="hero"
        bgImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab"
        title="Sứ Mệnh Lịch Sử của Giai Cấp Công Nhân"
        subtitle="Chương 2: Quan điểm của chủ nghĩa Mác-Lênin"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <button
            onClick={() => scrollToSection("section1")}
            className="inline-flex items-center gap-2 text-white border border-white/30 rounded-full px-6 py-3 hover:bg-white/10 transition-colors"
          >
            Khám phá <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </StorySection>

      {/* Section 1: Quan điểm cơ bản */}
      <StorySection
        id="section1"
        bgImage="https://images.unsplash.com/photo-1513828583688-c52646f309c1"
        title="I. Quan điểm cơ bản của chủ nghĩa Mác-Lênin"
      >
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <FeatureCard
            icon={Book}
            title="1. Khái niệm giai cấp công nhân"
            description="Giai cấp công nhân là giai cấp trực tiếp tham gia vào quá trình sản xuất công nghiệp hiện đại, không sở hữu tư liệu sản xuất, phải bán sức lao động để sống, và chịu sự bóc lột giá trị thặng dư bởi giai cấp tư sản."
          />
          <FeatureCard
            icon={Users}
            title="2. Đặc điểm cơ bản"
            description="Về vị trí kinh tế – xã hội: Là sản phẩm của nền sản xuất công nghiệp hiện đại. Về tư tưởng: Đại diện cho lợi ích của toàn thể nhân loại lao động. Về tổ chức: Có tính tổ chức cao, kỷ luật nghiêm ngặt."
          />
          <FeatureCard
            icon={Target}
            title="3. Sứ mệnh lịch sử thế giới"
            description="Lật đổ chế độ tư bản chủ nghĩa, xóa bỏ chế độ tư hữu tư bản. Xây dựng xã hội mới – xã hội xã hội chủ nghĩa và tiến tới cộng sản chủ nghĩa, nơi không còn áp bức bóc lột."
          />
        </div>
      </StorySection>

      {/* Section 2: Giai cấp công nhân hiện nay */}
      <StorySection
        id="section2"
        bgImage="https://images.unsplash.com/photo-1542744173-8e7e53415bb0"
        title="II. Giai cấp công nhân và việc thực hiện sứ mệnh lịch sử hiện nay"
      >
        <div className="max-w-6xl mx-auto px-4">
          <TimelineItem
            year="1. Bối cảnh hiện nay"
            title="Toàn cầu hóa và CMCN 4.0"
            description="Tại Việt Nam, quá trình toàn cầu hóa và cách mạng công nghiệp 4.0 đang tạo ra những biến đổi mạnh mẽ. Các khu công nghiệp hiện đại, nhà máy thông minh và số hóa sản xuất đang dần trở nên phổ biến, đặt ra những thách thức và cơ hội mới cho người lao động."
            isRight={false}
            image="https://bcp.cdnchinhphu.vn/Uploaded/nguyenhuythang/2021_12_08/digitaleconomy-818x460-15613879121091909436853-crop-15613879165961941291784.jpg"
          />
          <TimelineItem
            year="2. Thách thức"
            title="Thách thức đối với giai cấp công nhân"
            description="Công nhân Việt Nam đang đối mặt với nhiều thách thức như: khoảng cách thu nhập ngày càng lớn, áp lực nâng cao trình độ công nghệ, điều kiện làm việc và nhà ở còn nhiều khó khăn. Đặc biệt tại các khu công nghiệp lớn, vấn đề nhà ở và đời sống của công nhân cần được quan tâm nhiều hơn."
            isRight={true}
            image="https://static.tapchimattran.vn/zoom/1300/uploaded/dodong/2022_02_16/nghien%20cuu/11_demd.jpg"
          />
          <TimelineItem
            year="3. Vai trò"
            title="Vai trò của giai cấp công nhân"
            description="Giai cấp công nhân Việt Nam đang đóng vai trò quan trọng trong sự nghiệp công nghiệp hóa, hiện đại hóa đất nước. Họ không chỉ là lực lượng sản xuất chính mà còn là động lực cho sự đổi mới sáng tạo và phát triển bền vững của đất nước."
            isRight={false}
            image="https://www.quanlynhanuoc.vn/wp-content/uploads/2019/08/cong-nhan.jpg"
          />
        </div>
      </StorySection>

      {/* Section 3: Sứ mệnh lịch sử của GCCN Việt Nam */}
      <StorySection
        id="section3"
        bgImage={section3}
        title="III. Sứ mệnh lịch sử của giai cấp công nhân Việt Nam"
      >
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <FeatureCard
            icon={Target}
            title="1. Vai trò của GCCN Việt Nam"
            description="Là lực lượng đi đầu trong sự nghiệp công nghiệp hóa, hiện đại hóa đất nước. Là giai cấp lãnh đạo cách mạng thông qua đội tiền phong là Đảng Cộng sản Việt Nam."
          />
          <FeatureCard
            icon={Factory}
            title="2. Thực hiện sứ mệnh lịch sử"
            description="Xây dựng giai cấp công nhân lớn mạnh, thực hiện vai trò lãnh đạo cách mạng. Nâng cao bản lĩnh chính trị, trình độ học vấn và tay nghề cho công nhân."
          />
          <FeatureCard
            icon={Brain}
            title="3. Giải pháp phát huy vai trò"
            description="Tăng cường giáo dục chính trị tư tưởng. Đào tạo, bồi dưỡng nâng cao trình độ. Cải thiện điều kiện làm việc và đời sống. Phát huy vai trò của tổ chức Công đoàn."
          />
        </div>
      </StorySection>

      {/* Section 4: Thảo luận */}
      <StorySection
        id="section4"
        bgImage="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
        title="IV. Câu hỏi thảo luận"
        subtitle="Bác sĩ, giảng viên, IT hiện nay có phải là giai cấp công nhân không?"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* 1. Góc nhìn Mác-Lênin */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-4">
                1. Dưới góc nhìn Mác – Lênin, giai cấp công nhân là ai?
              </h3>
              <div className="text-white/80">
                <p className="mb-4">Giai cấp công nhân được xác định qua:</p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>
                    Vị trí trong hệ thống sản xuất:
                    <ul className="list-none pl-6 mt-2">
                      <li>- Không sở hữu tư liệu sản xuất</li>
                      <li>- Bán sức lao động để sống</li>
                    </ul>
                  </li>
                  <li>
                    Tính chất lao động:
                    <ul className="list-none pl-6 mt-2">
                      <li>- Trực tiếp sản xuất</li>
                      <li>
                        - Gián tiếp tham gia sản xuất trong nền kinh tế công
                        nghiệp
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>

            {/* 2. Phân tích từng nghề */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6">
                2. Phân tích từng nghề
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/5 p-6 rounded-lg"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Stethoscope className="w-8 h-8 text-blue-400" />
                    <h4 className="text-xl font-semibold text-white">Bác sĩ</h4>
                  </div>
                  <div className="text-white/80 space-y-2">
                    <p>• Hoạt động trong lĩnh vực dịch vụ</p>
                    <p>• Không trực tiếp sản xuất của cải vật chất</p>
                    <p>• Làm việc trong tổ chức công lập hoặc tư nhân</p>
                    <p>• Bản chất công việc là chăm sóc sức khỏe</p>
                    <p className="font-semibold mt-4">
                      → Không thuộc giai cấp công nhân
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/5 p-6 rounded-lg"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <GraduationCap className="w-8 h-8 text-green-400" />
                    <h4 className="text-xl font-semibold text-white">
                      Giảng viên
                    </h4>
                  </div>
                  <div className="text-white/80 space-y-2">
                    <p>• Làm việc trong lĩnh vực giáo dục</p>
                    <p>• Không tham gia trực tiếp sản xuất</p>
                    <p>• Gián tiếp đào tạo nguồn nhân lực</p>
                    <p>• Thuộc lĩnh vực phi sản xuất</p>
                    <p className="font-semibold mt-4">
                      → Không hoàn toàn đồng nhất với giai cấp công nhân
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/5 p-6 rounded-lg"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Computer className="w-8 h-8 text-purple-400" />
                    <h4 className="text-xl font-semibold text-white">
                      Nhân viên IT
                    </h4>
                  </div>
                  <div className="text-white/80 space-y-2">
                    <p>• Thuộc lĩnh vực sản xuất tri thức và công nghệ cao</p>
                    <p>• Không sở hữu tư liệu sản xuất khi làm thuê</p>
                    <p>• Công việc mang tính sáng tạo và tri thức cao</p>
                    <p>
                      • Không thuần túy là lao động công nghiệp truyền thống
                    </p>
                    <p className="font-semibold mt-4">
                      → Có đặc điểm của giai cấp công nhân hiện đại
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* 3. Kết luận */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-4">
                3. Kết luận
              </h3>
              <div className="text-white/80 space-y-4">
                <p>
                  Bác sĩ, giảng viên, và IT không hoàn toàn thuộc giai cấp công
                  nhân theo định nghĩa truyền thống của chủ nghĩa Mác – Lênin.
                </p>
                <p>
                  Tuy nhiên, trong bối cảnh kinh tế tri thức, họ là bộ phận lao
                  động trí thức gắn bó mật thiết với giai cấp công nhân, góp
                  phần thúc đẩy sự phát triển xã hội và nền kinh tế.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </StorySection>

      {/* Section 5: Lời cảm ơn */}
      <StorySection
        id="thanks"
        bgImage="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40"
        title="Lời cảm ơn"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20"
          >
            <h3 className="text-3xl font-bold text-white mb-6">
              Cảm ơn quý thầy cô và các bạn đã theo dõi
            </h3>
            <div className="text-white/80 space-y-4">
              <p className="text-xl">
                Chúc quý thầy cô và các bạn nhiều sức khỏe và thành công!
              </p>
              <p className="italic">"Học, học nữa, học mãi" - V.I.Lenin</p>
            </div>
          </motion.div>
        </div>
      </StorySection>
    </div>
  );
};

export default StorytellingPage;
