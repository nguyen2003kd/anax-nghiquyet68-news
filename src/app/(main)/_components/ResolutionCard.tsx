import React from "react";
//Icon
import { Calendar, Tag, FileText } from "lucide-react";
//Type
import { ResolutionCardProps } from "./lib/types";
//function
const ResolutionCard: React.FC<ResolutionCardProps> = ({
  category,
  title,
  date,
  description,
  onClick,
}) => {
  //function
  const getCategoryColor = (category: string) => {
    const colors = {
      'Kinh tế': 'bg-blue-100 text-blue-800',
      'Chính sách': 'bg-indigo-100 text-indigo-800',
      'Đầu tư': 'bg-green-100 text-green-800',
      'Policy': 'bg-indigo-100 text-indigo-800',
      'Reform': 'bg-purple-100 text-purple-800',
      'Technology': 'bg-cyan-100 text-cyan-800',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div
      onClick={onClick}
      className="group relative bg-gray/30 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2 border border-black/30 overflow-hidden"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-black/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Content */}
      <div className="relative p-6">  
        {/* Header */}
        <div className="flex items-start justify-between mb-4 gap-4">
          <div className="w-[70%] flex-shrink">
            <h3 className="text-[13px] md:text-[15px] font-bold text-gray-800 line-clamp-3 group-hover:text-red-700 transition-colors duration-300">
              {title}
            </h3>
          </div>
          <div className="w-[30%] flex justify-end">
            <span className={`inline-flex md:text-sm items-center gap-1 px-3 py-1 rounded-lg text-[13px] md:text-[15px] font-medium border ${getCategoryColor(category)}`}>
              <Tag className="w-4 h-4 md:hidden" />
              {category}
            </span>
          </div>
        </div>
        
        {/* Title */}
        {/* <h3 className="text-xl font-bold text-gray-800 mb-4 line-clamp-4 group-hover:text-red-700 transition-colors duration-300 ">
          {title}
        </h3> */}

        {/* Description */}
        <p className="text-base text-gray-600 leading-relaxed mb-5 line-clamp-3">
          {description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-5 border-t border-gray-100">
          <div className="flex items-center gap-2 text-red-500">
            <Calendar className="w-5 h-5" />
            <span className="text-base">{new Date(date).toLocaleDateString('vi-VN')}</span>
          </div>
          <div className="flex items-center gap-1 text-yellow-600 group-hover:text-red-600 transition-colors duration-300 font-semibold">
            <FileText className="w-5 h-5" />
            <span className="text-base font-medium">Xem chi tiết</span>
          </div>
        </div>
      </div>

      {/* Hover effect border */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-red-500 group-hover:to-yellow-500 transition-all duration-500" />
    </div>
  );
};

export default ResolutionCard;