import { Input } from '@/components/ui/input';
import { MAPS } from '@/constants/pathname';
import { ArrowLeft, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const RegisterSearchBar = () => {
  const navigate = useNavigate();
  const handleGoBack = () => navigate(-1);
  return (
    <header className="border-b flex items-center">
      <ArrowLeft size={24} onClick={handleGoBack} className="cursor-pointer" />
      <Input
        placeholder="장소를 검색해보세요."
        className="placeholder:text-primary-300 text-text-lg font-medium"
      />
      {/* 클릭시 카카오맵 연결 */}
      <Link to={MAPS}>
        <Search />
      </Link>
    </header>
  );
};

export default RegisterSearchBar;
