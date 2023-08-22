type KakaoUser = {
  email: string;
  nickname: string;
  profileImage: string;
};

export type KakaoRequest = Request & { user: KakaoUser };
