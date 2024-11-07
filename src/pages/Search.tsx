import React, { useState } from 'react';
import { Search as SearchIcon, Filter, Download, Loader2 } from 'lucide-react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { searchFiles, downloadFile, type ExamFile } from '../lib/services';
import { cn } from '../lib/utils';

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [year, setYear] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const searchQuery = useQuery({
    queryKey: ['files', searchTerm, year, selectedTags],
    queryFn: () => searchFiles({ query: searchTerm, year, tags: selectedTags }),
  });

  const downloadMutation = useMutation({
    mutationFn: downloadFile,
  });

  const handleDownload = (fileId: string) => {
    downloadMutation.mutate(fileId);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">過去問を検索</h1>
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="科目名で検索..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="w-32">
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="年度"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
            <Filter className="h-5 w-5" />
            <span>絞り込み</span>
          </button>
        </div>
      </div>

      {searchQuery.isPending ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
        </div>
      ) : searchQuery.isError ? (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg">
          エラーが発生しました。もう一度お試しください。
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm">
          {searchQuery.data.map((result: ExamFile) => (
            <div
              key={result.id}
              className="border-b last:border-b-0 p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {result.subject}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {result.year}年度 • アップロード: {result.uploadDate}
                  </p>
                </div>
                <button
                  onClick={() => handleDownload(result.id)}
                  disabled={downloadMutation.isPending}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors",
                    downloadMutation.isPending
                      ? "text-gray-400 bg-gray-100 cursor-not-allowed"
                      : "text-indigo-600 hover:bg-indigo-50"
                  )}
                >
                  {downloadMutation.isPending ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Download className="h-5 w-5" />
                  )}
                  <span>ダウンロード</span>
                </button>
              </div>
              <div className="flex gap-2">
                {result.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-2 text-sm text-gray-500">
                {result.downloads} 回ダウンロード
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}