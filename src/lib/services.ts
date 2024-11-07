// Mock API service
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export interface ExamFile {
  id: string;
  name: string;
  subject: string;
  year: number;
  tags: string[];
  uploadDate: string;
  downloads: number;
  url: string;
}

const mockFiles: ExamFile[] = [
  {
    id: '1',
    name: '線形代数学_2023_期末試験.pdf',
    subject: '線形代数学',
    year: 2023,
    tags: ['数学', '期末試験'],
    uploadDate: '2024-02-20',
    downloads: 45,
    url: '#'
  },
  {
    id: '2',
    name: '微分積分学_2023_中間試験.pdf',
    subject: '微分積分学',
    year: 2023,
    tags: ['数学', '中間試験'],
    uploadDate: '2024-02-18',
    downloads: 32,
    url: '#'
  }
];

export const uploadFiles = async (
  files: File[],
  metadata: {
    subject: string;
    year: string;
    tags: string[];
    comment: string;
  }
) => {
  await delay(1500); // Simulate network delay
  console.log('Uploading files:', files, metadata);
  return { success: true, message: 'ファイルがアップロードされました' };
};

export const searchFiles = async (params: {
  query?: string;
  year?: string;
  tags?: string[];
}) => {
  await delay(800);
  let results = [...mockFiles];
  
  if (params.query) {
    results = results.filter(file => 
      file.subject.toLowerCase().includes(params.query!.toLowerCase())
    );
  }
  
  if (params.year) {
    results = results.filter(file => 
      file.year === parseInt(params.year!)
    );
  }
  
  if (params.tags && params.tags.length > 0) {
    results = results.filter(file => 
      params.tags!.some(tag => file.tags.includes(tag))
    );
  }
  
  return results;
};

export const downloadFile = async (fileId: string) => {
  await delay(1000);
  const file = mockFiles.find(f => f.id === fileId);
  if (!file) throw new Error('ファイルが見つかりません');
  
  // In a real application, this would trigger a file download
  console.log('Downloading file:', file.name);
  return { success: true, message: 'ダウンロードを開始しました' };
};