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
  Share2,
  TrendingUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import section3 from "../assets/thumbnail.jpg";
import TableOfContents from "./TableContent";
import FloatingOrbsFeatures from "./FloatingOrbsFeatures";

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
        subtitle="Chương 2 - Nhóm 2 - Môn MLN131"
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

      <TableOfContents scrollToSection={scrollToSection} />

      {/* Section 1: Quan điểm cơ bản */}
      <StorySection
        id="section1"
        bgImage="data:image/jpeg;base64,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"
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
            description="Quá trình toàn cầu hóa và cách mạng công nghiệp 4.0 đang tạo ra những biến đổi to lớn trong cơ cấu kinh tế - xã hội, ảnh hưởng đến giai cấp công nhân.
Lực lượng công nhân không chỉ tập trung trong các ngành công nghiệp truyền thống mà còn mở rộng sang các ngành công nghiệp công nghệ cao, dịch vụ, và tri thức.
"
            isRight={false}
            image="https://bcp.cdnchinhphu.vn/Uploaded/nguyenhuythang/2021_12_08/digitaleconomy-818x460-15613879121091909436853-crop-15613879165961941291784.jpg"
          />
          <TimelineItem
            year="2. Thách thức"
            title="Thách thức đối với giai cấp công nhân"
            description="Sự phân hóa giàu nghèo ngày càng sâu sắc trong xã hội tư bản.
Lao động trong các ngành công nghệ và tri thức cao không hoàn toàn đồng nhất với lao động công nghiệp truyền thống, dẫn đến sự phân tầng trong chính nội bộ giai cấp công nhân.
Sự xâm nhập của tư tưởng tư sản, ảnh hưởng đến ý thức tổ chức và tính cách mạng của giai cấp công nhân.
"
            isRight={true}
            image="https://static.tapchimattran.vn/zoom/1300/uploaded/dodong/2022_02_16/nghien%20cuu/11_demd.jpg"
          />
          <TimelineItem
            year="3. Vai trò"
            title="Vai trò của giai cấp công nhân"
            description="Tiếp tục giữ vai trò nòng cốt trong cuộc đấu tranh xóa bỏ chế độ tư bản và xây dựng xã hội xã hội chủ nghĩa.
Tham gia tích cực vào quá trình đổi mới, sáng tạo, làm chủ khoa học công nghệ, nâng cao năng lực sản xuất và sức mạnh kinh tế.
Duy trì tính tổ chức, đoàn kết, và ý thức cách mạng trong đấu tranh chính trị và kinh tế.
"
            isRight={false}
            image="https://www.quanlynhanuoc.vn/wp-content/uploads/2019/08/cong-nhan.jpg"
          />
        </div>
      </StorySection>

      {/* Section 3: Sứ mệnh lịch sử của GCCN Việt Nam */}
      <StorySection
        id="section3"
        bgImage={section3}
        title="III. Sứ mệnh lịch sử của giai cấp công nhân"
      >
        <FloatingOrbsFeatures
          features={[
            {
              icon: Briefcase,
              title: "Vai trò của GCCN Việt Nam",
              description:
                "Là lực lượng tiên phong trong cuộc đấu tranh giải phóng dân tộc, lật đổ chế độ thực dân phong kiến, giành độc lập và xây dựng chủ nghĩa xã hội.",
            },
            {
              icon: Share2,
              title: "Sứ mệnh lịch sử",
              description:
                "Giai cấp công nhân Việt Nam đang đứng trước những cơ hội và thách thức trong bối cảnh hội nhập kinh tế quốc tế và cách mạng công nghiệp lần thứ tư.",
            },
            {
              icon: TrendingUp,
              title: "Giải pháp phát huy vai trò",
              description:
                "Nâng cao chất lượng đào tạo và giáo dục chính trị tư tưởng cho công nhân. Cải thiện điều kiện lao động và đời sống, đảm bảo quyền lợi của giai cấp công nhân.",
            },
          ]}
        />
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
