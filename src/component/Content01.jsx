import React, { useState, useEffect } from "react";
import { ChevronDown, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TableOfContents = ({ onNavigate }) => {
  const sections = [
    {
      title: "I. Quan điểm cơ bản của chủ nghĩa Mác-Lênin",
      subsections: [
        "1. Giai cấp công nhân trong chủ nghĩa Mác-Lênin",
        "2. Sứ mệnh lịch sử thế giới của giai cấp công nhân",
      ],
    },
    {
      title: "II. Giai cấp công nhân hiện nay",
      subsections: [
        "1. Thực trạng giai cấp công nhân",
        "2. Vai trò hiện nay",
        "3. Thách thức đặt ra",
      ],
    },
    {
      title: "III. Sứ mệnh lịch sử của giai cấp công nhân Việt Nam",
      subsections: [
        "1. Vai trò trong lịch sử dân tộc",
        "2. Thách thức trong hội nhập quốc tế",
        "3. Phương hướng phát triển",
      ],
    },
    {
      title: "IV. Bác sĩ, giảng viên, IT và giai cấp công nhân",
      subsections: [],
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed left-4 top-20 bg-white p-6 rounded-lg shadow-xl w-72 z-40 max-h-[80vh] overflow-y-auto"
    >
      <h3 className="text-xl font-bold mb-4 text-gray-800">Mục lục</h3>
      <div className="space-y-4">
        {sections.map((section, idx) => (
          <div key={idx} className="space-y-2">
            <button
              onClick={() => onNavigate(section.title)}
              className="text-left font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-300"
            >
              {section.title}
            </button>
            {section.subsections.map((sub, subIdx) => (
              <button
                key={subIdx}
                onClick={() => onNavigate(sub)}
                className="block ml-4 text-sm text-gray-600 hover:text-blue-600 transition-colors duration-300"
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

const HistoricalMissionPage = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showTOC, setShowTOC] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(currentProgress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigate = (sectionTitle) => {
    const element = document.getElementById(
      sectionTitle.toLowerCase().replace(/\s+/g, "-")
    );
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* Progress bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-blue-600 transition-all duration-300 z-50"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Navigation toggle */}
      <button
        onClick={() => setShowTOC(!showTOC)}
        className="fixed top-4 left-4 z-50 bg-white p-2 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Table of Contents */}
      <AnimatePresence>
        {showTOC && <TableOfContents onNavigate={handleNavigate} />}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
            alt="Modern workforce"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center max-w-5xl px-6"
        >
          <h1 className="text-6xl font-bold mb-8 font-serif">
            Sứ Mệnh Lịch Sử của Giai Cấp Công Nhân
          </h1>
          <p className="text-2xl mb-12 font-light">
            Hành trình phát triển và vai trò quan trọng trong xã hội hiện đại
          </p>
          <ChevronDown className="w-12 h-12 mx-auto animate-bounce cursor-pointer" />
        </motion.div>
      </section>

      {/* Content Sections - Using larger grids and improved typography */}
      <section
        id="i.-quan-điểm-cơ-bản-của-chủ-nghĩa-mác-lênin"
        className="py-24 bg-white"
      >
        <div className="container mx-auto px-8">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-serif font-bold mb-16 text-center"
          >
            I. Quan điểm cơ bản của chủ nghĩa Mác-Lênin
          </motion.h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-semibold mb-6">
                1. Giai cấp công nhân trong chủ nghĩa Mác-Lênin
              </h3>
              <p className="text-lg leading-relaxed">
                Giai cấp công nhân là giai cấp lao động trong nền sản xuất công
                nghiệp hiện đại, gắn liền với các phương tiện sản xuất tiên
                tiến.
              </p>
              <p className="text-lg leading-relaxed">
                Họ không sở hữu tư liệu sản xuất và phải bán lao động để sinh
                sống.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-semibold mb-6">
                2. Sứ mệnh lịch sử thế giới
              </h3>
              <p className="text-lg leading-relaxed">
                Là giai cấp duy nhất có khả năng xóa bỏ chế độ tư bản và xây
                dựng chủ nghĩa xã hội.
              </p>
              <p className="text-lg leading-relaxed">
                Là giai cấp đại diện cho xu hướng phát triển lịch sử tiến bộ,
                giải phóng xã hội, giải phóng con người.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section II */}
      <section
        id="ii.-giai-cấp-công-nhân-hiện-nay"
        className="py-24 bg-gray-50"
      >
        <div className="container mx-auto px-8">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-serif font-bold mb-16 text-center"
          >
            II. Giai cấp công nhân và việc thực hiện sứ mệnh lịch sử hiện nay
          </motion.h2>

          {/* Thực trạng */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-semibold mb-6">
                1. Thực trạng giai cấp công nhân
              </h3>
              <div className="space-y-4">
                <p className="text-lg leading-relaxed">
                  Quá trình toàn cầu hoá và sự phát triển nhanh chóng của khoa
                  học kỹ thuật.
                </p>
                <p className="text-lg leading-relaxed">
                  Sự tăng cường tự động hoá, số hoá và các thách thức đặt ra cho
                  giai cấp công nhân.
                </p>
              </div>
            </motion.div>

            {/* Vai trò hiện nay */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-semibold mb-6">
                2. Vai trò hiện nay
              </h3>
              <div className="space-y-4">
                <p className="text-lg leading-relaxed">
                  Duy trì vai trò chính yếu trong nền kinh tế.
                </p>
                <p className="text-lg leading-relaxed">
                  Tham gia vào các phong trào xã hội, đấu tranh vì quyền lợi
                  kinh tế, chính trị, văn hoá.
                </p>
                <p className="text-lg leading-relaxed">
                  Góp phần xây dựng nhà nước pháp quyền xã hội chủ nghĩa.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Thách thức */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <h3 className="text-2xl font-semibold mb-6">
              3. Thách thức đặt ra
            </h3>
            <div className="space-y-4">
              <p className="text-lg leading-relaxed">
                Đối mặt với tự do hoá lao động và xu hướng tối đa hoá lợi nhuận.
              </p>
              <p className="text-lg leading-relaxed">
                Bài toán đồng kết lực lượng lao động trong bối cảnh mới.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section III */}
      <section
        id="iii.-sứ-mệnh-lịch-sử-của-giai-cấp-công-nhân-việt-nam"
        className="py-24 bg-white"
      >
        <div className="container mx-auto px-8">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-serif font-bold mb-16 text-center"
          >
            III. Sứ mệnh lịch sử của giai cấp công nhân Việt Nam
          </motion.h2>

          {/* Vai trò trong lịch sử */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-semibold mb-6">
                1. Vai trò trong lịch sử dân tộc
              </h3>
              <div className="space-y-4">
                <p className="text-lg leading-relaxed">
                  Là lực lượng đầu tiên trong phong trào cách mạng giải phóng
                  dân tộc.
                </p>
                <p className="text-lg leading-relaxed">
                  Góp phần quan trọng trong sự nghiệp đổi mới và phát triển kinh
                  tế.
                </p>
              </div>
            </motion.div>

            {/* Thách thức hội nhập */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-semibold mb-6">
                2. Thách thức trong hội nhập quốc tế
              </h3>
              <div className="space-y-4">
                <p className="text-lg leading-relaxed">
                  Sự tăng cường cạnh tranh trong nước và ngoài nước.
                </p>
                <p className="text-lg leading-relaxed">
                  Nhu cầu nâng cao trình độ chuyên môn, kỹ năng để đáp ứng yêu
                  cầu của thị trường lao động.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Phương hướng phát triển */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <h3 className="text-2xl font-semibold mb-6">
              3. Phương hướng phát triển
            </h3>
            <div className="space-y-4">
              <p className="text-lg leading-relaxed">
                Xây dựng giai cấp công nhân Việt Nam làm lực lượng đi đầu trong
                sự nghiệp công nghiệp hóa, hiện đại hóa.
              </p>
              <p className="text-lg leading-relaxed">
                Nâng cao trình độ nhận thức chính trị và khả năng đấu tranh vì
                quyền lợi chính đáng của giai cấp công nhân.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final Question Section */}
      <section
        id="iv.-bác-sĩ-giảng-viên-it-và-giai-cấp-công-nhân"
        className="py-24 bg-gray-50"
      >
        <div className="container mx-auto px-8">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-serif font-bold mb-16 text-center"
          >
            Bác sĩ, giảng viên, IT hiện nay có phải là giai cấp công nhân không?
          </motion.h2>
          <div className="max-w-4xl mx-auto space-y-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-xl leading-relaxed"
            >
              Dưới góc độ nhận thức xã hội, bác sĩ, giảng viên, và IT không phải
              giai cấp công nhân truyền thống.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-xl leading-relaxed"
            >
              Tuy nhiên, họ thuộc về tầng lớp lao động trực tiếp, tham gia quá
              trình sản xuất giá trị thiết yếu dựa vào lao động trí óc, nên có
              sự tương đồng nhất định.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-xl leading-relaxed"
            >
              Góc nhìn hiện đại: Những người làm việc trí óc trong nền kinh tế
              số cũng được xem là một bộ phận quan trọng trong tầng lớp lao động
              mới.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-8 text-center">
          <p className="text-lg">© 2025 - Tài liệu học tập MLN131 - Nhóm 2</p>
        </div>
      </footer>
    </div>
  );
};

export default HistoricalMissionPage;
