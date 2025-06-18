"use client"
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Sidebar from '@/app/(main)/_lib/layout/Sidebar';

interface PolicySection {
  id: string;
  title: string;
  content: string;
  articles?: string[];
}

const policySections: PolicySection[] = [
  {
    id: 'section1',
    title: 'CHƯƠNG I: QUY ĐỊNH CHUNG',
    content: 'Các quy định cơ bản về phạm vi áp dụng và đối tượng thực hiện',
    articles: [
      'Điều 1: Phạm vi điều chỉnh và đối tượng áp dụng của Nghị quyết này',
      'Điều 2: Giải thích từ ngữ và thuật ngữ chuyên môn được sử dụng',
      'Điều 3: Nguyên tắc thực hiện và tuân thủ các quy định'
    ]
  },
  {
    id: 'section2',
    title: 'CHƯƠNG II: CÁC QUY ĐỊNH CỤ THỂ',
    content: 'Nội dung chi tiết về các quy định và thủ tục thực hiện',
    articles: [
      'Điều 4: Quy trình thực hiện các thủ tục hành chính',
      'Điều 5: Trách nhiệm của các cơ quan, tổ chức và cá nhân',
      'Điều 6: Các biện pháp kiểm tra, giám sát và xử lý vi phạm',
      'Điều 7: Cơ chế phối hợp giữa các cơ quan có liên quan'
    ]
  },
  {
    id: 'section3',
    title: 'CHƯƠNG III: TỔ CHỨC THỰC HIỆN',
    content: 'Hướng dẫn triển khai và thực hiện Nghị quyết',
    articles: [
      'Điều 8: Trách nhiệm của Chính phủ và các Bộ, ngành',
      'Điều 9: Trách nhiệm của Ủy ban nhân dân các cấp',
      'Điều 10: Hiệu lực thi hành và các quy định chuyển tiếp'
    ]
  }
];

function App() {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const toggleSection = (id: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedSections(newExpanded);
  };



  return (
    <div className="w-full mx-auto min-h-screen flex lg:flex-row flex-col">
      
      {/* Main Content */}
      <main className="w-full lg:w-[80%] flex-grow relative overflow-x-hidden">
        {/* Content Layout with Sidebar */}
        <div className=" md:max-w-7xl mx-auto flex">
          {/* Document Container */}
          <div className="flex-1 md:px-4 md:pb-[120px] lg:pb-0">
            {/* Gold-trimmed frame */}
            <div className=" md:border-8 md:border-double md:border-yellow-600 md:bg-gradient-to-br md:from-amber-50 md:to-orange-50 md:shadow-2xl relative">
              {/* Inner ornate border */}
              <div className="md:border-4 md:border-yellow-500 m-4 relative bg-gradient-to-b from-orange-50 to-amber-50">
                {/* Document content */}
                <div className="p-2 md:p-12 relative">
                  
                  {/* Header Section */}
                  <div className="text-center mb-12 relative">
                    <h1 className="text-lg md:text-xl font-bold text-red-800 tracking-wide mb-2">
                      CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
                    </h1>
                    <div className="w-32 h-0.5 bg-red-800 mx-auto mb-4"></div>
                    <p className="text-base md:text-lg font-semibold text-red-700 italic">
                      Độc lập - Tự do - Hạnh phúc
                    </p>
                    <div className="w-48 h-0.5 bg-red-800 mx-auto mt-4"></div>
                  </div>

                  {/* Main Title */}
                  <div className="text-center mb-16">
                    <h2 className="text-2xl md:text-4xl font-bold text-red-900 mb-6 tracking-wider ">
                      NGHỊ QUYẾT SỐ 68/CP
                    </h2>
                    <div className="w-64 h-1 bg-gradient-to-r from-transparent via-red-800 to-transparent mx-auto mb-6"></div>
                    <p className="text- md:text-xl text-red-800 font-semibold leading-relaxed">
                      Về việc ban hành quy định mới<br />trong lĩnh vực chính sách công
                    </p>
                    <div className="mt-8 text-right">
                      <p className="text-base text-gray-700 italic">
                        Hà Nội, ngày 15 tháng 12 năm 2024
                      </p>
                    </div>
                  </div>

                  {/* Policy Sections */}
                  <div className="space-y-8">
                    {policySections.map((section) => (
                      <div key={section.id} className="border-l-4 border-red-700 bg-white/50 rounded-r-lg shadow-lg">
                        <button
                          onClick={() => toggleSection(section.id)}
                          className="w-full text-left p-6 flex justify-between items-center hover:bg-red-50/50 transition-colors duration-200"
                        >
                          <div>
                            <h3 className="text-xl md:text-2xl font-bold text-red-900 mb-2">
                              {section.title}
                            </h3>
                            <p className="text-gray-700 text-base md:text-lg">
                              {section.content}
                            </p>
                          </div>
                          {expandedSections.has(section.id) ? (
                            <ChevronUp className="text-red-700 flex-shrink-0 ml-4" size={24} />
                          ) : (
                            <ChevronDown className="text-red-700 flex-shrink-0 ml-4" size={24} />
                          )}
                        </button>
                        
                        {expandedSections.has(section.id) && section.articles && (
                          <div className="px-6 pb-6 animate-in slide-in-from-top duration-300">
                            <div className="bg-white/80 rounded-lg p-6 border border-red-200">
                              <ul className="space-y-4">
                                {section.articles.map((article, index) => (
                                  <li key={index} className="flex items-start">
                                    <span className="w-2 h-2 bg-red-700 rounded-full mt-3 mr-4 flex-shrink-0"></span>
                                    <p className="text-gray-800 text-base md:text-lg leading-relaxed">
                                      {article}
                                    </p>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Signature Section */}
                  <div className="mt-16 flex flex-col md:flex-row justify-between items-end">
                    {/* Authority */}
                    <div className="text-center md:ml-auto">
                      <p className="text-lg font-bold text-red-900 mb-4">
                        THỦ TƯỚNG CHÍNH PHỦ
                      </p>
                      <div className="h-20 mb-4"></div>
                      <p className="text-base font-semibold text-gray-800">
                        Phạm Minh Chính
                      </p>
                    </div>
                  </div>Thao tác nhanh
                </div>
              </div>
            </div>
          </div>
          {/* <div className="hidden min-w-[320px]">
            <Sidebar />
          </div> */}
        </div>
      </main>
        <div className=" lg:block w-full lg:w-[20%]">
            <Sidebar />
          </div>

    </div>
  );
}

export default App;