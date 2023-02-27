class ToggleService {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new ToggleService();
        }
        return this.#instance;
    }

    loadlogin() {
        const menuAside = document.querySelector(".menu-aside");
        const principal = PrincipalApi.getInstance().getPrincipal();

        menuAside.innerHTML = `
                ${principal == null 
                    ? `
                    <div class="mypage-login">
                <div class="profile-box">
                    <a href="/account/login" class="link-profile">
                        <div class="profile-img">
                            <img class="user-profile" src="https://t1.kakaocdn.net/estoreweb/images/20220905161229/profile_default.png" alt="사용자">
                        </div>
                        <span class="login">로그인></span>
                    </a>
                </div>
                <div class="mypage-info">
                    <ul class="mypage-box">
                        <li class="mypage-home">
                            <a href="" class="mypage-link">
                                <i class="fa-regular fa-face-smile"></i>
                                <p class="mypage-chart">구매내역</p>
                            </a>
                        </li>
                        <li class="mypage-new">
                            <a href="" class="mypage-link">
                                <i class="fa-solid fa-gift"></i>
                                <p class="mypage-chart">선물함</p>
                            </a>
                        </li>
                        <li mypage="mypage-popularity">
                            <a href="" class="mypage-link">
                                <i class="fa-solid fa-ticket-simple"></i>
                                <p class="mypage-chart">쿠폰함</p>
                            </a>
                        </li>
                        <li class="mypage-style">
                            <a href="" class="mypage-link">
                                <i class="fa-regular fa-heart"></i>
                                <p class="mypage-chart">좋아요</p>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div>
                <ul class="abc">
                    <li class="abc-li">
                        <a href="/index" class="mypage-buttons">홈</a>
                    </li>
                    <li class="abc-li">
                        <a href="/main/newemoticon" class="mypage-buttons">신규</a>
                    </li>
                    <li class="abc-li">
                        <a href="/main/hot" class="mypage-buttons">인기</a>
                    </li>
                    <li class="abc-li">
                        <a href="" class="mypage-buttons">스타일</a>
                    </li>
                </ul>
            </div>
            <div>
                <ul class="abcd">
                    <li class="nqp-inform">
                        <a href="https://e.kakao.com/notices" class="nqp-link">새소식</a>
                    </li>
                    <li class="abcd-a">
                        <a href="https://e.kakao.com/faq" class="nqp-link">자주묻는 질문</a>
                    </li>
                    <li class="abcd-a">
                        <a href="https://e.kakao.com/number" class="nqp-link">이모티콘 일련번호 입력하기</a>
                    </li>
                </ul>
            </div>
            <div class="company-footer">
                <div>
                    <a href="" class="company-link">
                        <span class="company-kakao">kakao</span><span class="company-emoticon">emoticon</span><span class="company-shop">shop</span>
                    </a>
                </div>
                <div>
                    <a href="https://www.kakaocorp.com" class="company-link2">@ kakao Corp</a>
                </div>
            </div>
                    `
                    : `
                    <div class="mypage-login">
                <div class="profile-box">
                    <div class="link-profile">
                        <div class="profile-img">
                            <img class="user-profile" src="https://t1.kakaocdn.net/estoreweb/images/20220905161229/profile_default.png" alt="사용자">
                        </div>
                        <span class="login">${principal.user.name}</span>
                        <span class="login">${principal.user.email}</span>
                    </div>
                </div>
                <div class="mypage-info">
                    <ul class="mypage-box">
                        <li class="mypage-home">
                            <a href="" class="mypage-link">
                                <i class="fa-regular fa-face-smile"></i>
                                <p class="mypage-chart">구매내역</p>
                            </a>
                        </li>
                        <li class="mypage-new">
                            <a href="" class="mypage-link">
                                <i class="fa-solid fa-gift"></i>
                                <p class="mypage-chart">선물함</p>
                            </a>
                        </li>
                        <li mypage="mypage-popularity">
                            <a href="" class="mypage-link">
                                <i class="fa-solid fa-ticket-simple"></i>
                                <p class="mypage-chart">쿠폰함</p>
                            </a>
                        </li>
                        <li class="mypage-style">
                            <a href="" class="mypage-link">
                                <i class="fa-regular fa-heart"></i>
                                <p class="mypage-chart">좋아요</p>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div>
                <ul class="abc">
                    <li class="abc-li">
                        <a href="/index" class="mypage-buttons">홈</a>
                    </li>
                    <li class="abc-li">
                        <a href="/main/newemoticon" class="mypage-buttons">신규</a>
                    </li>
                    <li class="abc-li">
                        <a href="/main/hot" class="mypage-buttons">인기</a>
                    </li>
                    <li class="abc-li">
                        <a href="" class="mypage-buttons">스타일</a>
                    </li>
                </ul>
            </div>
            <div>
                <ul class="abcd">
                    <li class="nqp-inform">
                        <a href="https://e.kakao.com/notices" class="nqp-link">새소식</a>
                    </li>
                    <li class="abcd-a">
                        <a href="https://e.kakao.com/faq" class="nqp-link">자주묻는 질문</a>
                    </li>
                    <li class="abcd-a">
                        <a href="https://e.kakao.com/number" class="nqp-link">이모티콘 일련번호 입력하기</a>
                    </li>
                </ul>
            </div>
            <div class="company-footer">
                <div>
                    <a href="" class="company-link">
                        <span class="company-kakao">kakao</span><span class="company-emoticon">emoticon</span><span class="company-shop">shop</span>
                    </a>
                </div>
                <div>
                    <a href="https://www.kakaocorp.com" class="company-link2">@ kakao Corp</a>
                </div>
            </div>
                
                    `
                }
            </ul>
        `;
    }

}