
import { FileText, Download, Search, ChevronRight, Users, Info, BookOpen, HelpCircle } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="w-60 bg-white/90 border-1 border-gray-200 shadow-lg">
      <div className="p-6 space-y-8">
        
        {/* Quick Actions */}
        <div>
          <h3 className="text-lg font-bold text-red-900 mb-4">Thao tác nhanh</h3>
          <div className="space-y-3">
            <button className="w-full bg-red-700 hover:bg-red-800 text-white p-4 rounded-lg transition-colors duration-200 flex items-center space-x-3">
              <FileText size={20} />
              <span>Đăng ký hỗ trợ</span>
            </button>
            <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 p-4 rounded-lg transition-colors duration-200 flex items-center space-x-3  border border-gray-300">
              <Download size={20} />
              <span>Tải văn bản gốc</span>
            </button>
            <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 p-4 rounded-lg transition-colors duration-200 flex items-center space-x-3 ">
              <Search size={20} />
              <span>Tra cứu hồ sơ</span>
            </button>
          </div>
        </div>

        {/* Related Links */}
        <div>
          <h3 className="text-lg font-bold text-red-900 mb-4">Liên kết liên quan</h3>
          <div className="space-y-2">
            <a href="#" className="flex items-center justify-between p-3 text-gray-700 hover:bg-red-50 rounded-lg transition-colors duration-200 group ">
              <div className="flex items-center space-x-3">
                <Users size={18} className="text-red-600" />
                <span>Nghị định hướng dẫn thi hành</span>
              </div>
              <ChevronRight size={16} className="text-gray-400 group-hover:text-red-600 transition-colors" />
            </a>
            
            <a href="#" className="flex items-center justify-between p-3 text-gray-700 hover:bg-red-50 rounded-lg transition-colors duration-200 group ">
              <div className="flex items-center space-x-3">
                <Info size={18} className="text-red-600" />
                <span>Thông tư quy định chi tiết</span>
              </div>
              <ChevronRight size={16} className="text-gray-400 group-hover:text-red-600 transition-colors" />
            </a>
            
            <a href="#" className="flex items-center justify-between p-3 text-gray-700 hover:bg-red-50 rounded-lg transition-colors duration-200 group ">
              <div className="flex items-center space-x-3">
                <BookOpen size={18} className="text-red-600" />
                <span>Hướng dẫn thực hiện</span>
              </div>
              <ChevronRight size={16} className="text-gray-400 group-hover:text-red-600 transition-colors" />
            </a>
            
            <a href="#" className="flex items-center justify-between p-3 text-gray-700 hover:bg-red-50 rounded-lg transition-colors duration-200 group ">
              <div className="flex items-center space-x-3">
                <HelpCircle size={18} className="text-red-600" />
                <span>Câu hỏi thường gặp</span>
              </div>
              <ChevronRight size={16} className="text-gray-400 group-hover:text-red-600 transition-colors" />
            </a>
          </div>
        </div>

        {/* Additional Info Box */}
        <div className="bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-red-900 mb-2 ">Thông tin quan trọng</h4>
          <p className="text-xs text-red-700 leading-relaxed ">
            Nghị quyết này có hiệu lực từ ngày 01/01/2025. Các quy định trước đây trái với Nghị quyết này đều bị bãi bỏ.
          </p>
          <div className="mt-3 pt-3 border-t border-red-200">
            <p className="text-xs text-red-600 ">
              <strong>Cập nhật:</strong> 15/12/2024
            </p>
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-300 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-amber-900 mb-2 ">Hỗ trợ trực tuyến</h4>
          <p className="text-xs text-amber-800 mb-3 ">
            Cần hỗ trợ về nội dung Nghị quyết?
          </p>
          <button className="w-full bg-amber-600 hover:bg-amber-700 text-white text-xs py-2 px-3 rounded  transition-colors">
            Liên hệ chuyên viên
          </button>
        </div>
      </div>
    </aside>
  );
}