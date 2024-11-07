import React from 'react';
import { Link } from 'react-router-dom';
import { Upload, Search, Tags, MessageSquare } from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: Upload,
      title: '過去問のアップロード',
      description: '問題用紙、解答用紙、答案用紙をPDF形式でアップロード',
    },
    {
      icon: Search,
      title: '高度な検索機能',
      description: '科目名や年度による柔軟な検索オプション',
    },
    {
      icon: Tags,
      title: 'タグ管理システム',
      description: '管理者による統一されたタグ付けで効率的な整理',
    },
    {
      icon: MessageSquare,
      title: 'コメント機能',
      description: '講義や過去問に対する有益な情報共有',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          過去問データベースへようこそ
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          効率的な学習をサポートする総合的な過去問管理システム
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {features.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <Icon className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-4">はじめましょう</h2>
        <p className="mb-6">アカウントを作成して、過去問の共有を始めましょう</p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/login"
            className="bg-white text-indigo-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            ログイン
          </Link>
          <Link
            to="/upload"
            className="bg-indigo-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-400 transition-colors"
          >
            アップロードする
          </Link>
        </div>
      </div>
    </div>
  );
}