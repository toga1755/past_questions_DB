import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload as UploadIcon, File, X, Loader2 } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { uploadFiles } from '../lib/services';
import { cn } from '../lib/utils';

export default function Upload() {
  const [files, setFiles] = useState<File[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [subject, setSubject] = useState('');
  const [year, setYear] = useState('');
  const [comment, setComment] = useState('');

  const uploadMutation = useMutation({
    mutationFn: (data: { files: File[], metadata: any }) => 
      uploadFiles(data.files, data.metadata),
    onSuccess: () => {
      setFiles([]);
      setSubject('');
      setYear('');
      setTags([]);
      setComment('');
    },
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(prev => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
  });

  const removeFile = (name: string) => {
    setFiles(files.filter(file => file.name !== name));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    uploadMutation.mutate({
      files,
      metadata: {
        subject,
        year,
        tags,
        comment,
      },
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">過去問のアップロード</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            PDFファイル
          </label>
          <div
            {...getRootProps()}
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
              isDragActive ? "border-indigo-500 bg-indigo-50" : "border-gray-300 hover:border-indigo-400"
            )}
          >
            <input {...getInputProps()} />
            <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              ファイルをドラッグ＆ドロップ、またはクリックして選択
            </p>
            <p className="text-xs text-gray-500">PDF形式のみ対応</p>
          </div>
        </div>

        {files.length > 0 && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              選択されたファイル
            </label>
            <div className="space-y-2">
              {files.map(file => (
                <div
                  key={file.name}
                  className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                >
                  <div className="flex items-center space-x-2">
                    <File className="h-5 w-5 text-gray-500" />
                    <span className="text-sm text-gray-700">{file.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(file.name)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              科目名
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              年度
            </label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            コメント
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          disabled={uploadMutation.isPending || files.length === 0}
          className={cn(
            "w-full py-2 px-4 rounded-lg flex items-center justify-center gap-2",
            uploadMutation.isPending
              ? "bg-indigo-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700",
            "text-white transition-colors"
          )}
        >
          {uploadMutation.isPending ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              アップロード中...
            </>
          ) : (
            "アップロード"
          )}
        </button>

        {uploadMutation.isSuccess && (
          <div className="p-4 bg-green-50 text-green-700 rounded-lg">
            ファイルが正常にアップロードされました
          </div>
        )}

        {uploadMutation.isError && (
          <div className="p-4 bg-red-50 text-red-700 rounded-lg">
            エラーが発生しました。もう一度お試しください。
          </div>
        )}
      </form>
    </div>
  );
}