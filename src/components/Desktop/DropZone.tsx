import { Upload } from 'lucide-react'

export function DropZone() {
  return (
    <div className="absolute inset-0 bg-blue-500/20 backdrop-blur-sm flex items-center justify-center z-[9998]">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md text-center border-4 border-dashed border-blue-400">
        <Upload size={64} className="mx-auto mb-4 text-blue-500" />
        <h3 className="text-xl font-bold text-gray-800 mb-2">拖放文件上传</h3>
        <p className="text-gray-600">
          将文件拖放到这里上传到虚拟桌面
        </p>
        <p className="text-sm text-gray-400 mt-4">
          支持图片、文档、视频等文件
        </p>
      </div>
    </div>
  )
}
