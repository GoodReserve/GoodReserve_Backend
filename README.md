# GoodReserve_Backend
2016 STS Project Backend

## Database Schema

> User Schema

    _id : String
    사용자의 고유 식별번호 입니다.
    
    email : String
    사용자의 이메일 입니다. 로컬서버 로그인에 사용됩니다.
    
    password : String
    사용자의 비밀번호 입니다. 로컬서버 로그인에 사용됩니다.
    
    name : String
    사용자의 이름입니다.
     
    phone : String
    사용자의 전화번호입니다.
    
    auth_token : String
    사용자의 자동로그인 토큰입니다.
    
    reservation : String
    사용자의 예약의 고유 식별번호입니다.
    
    reservation_wating : String Array
    사용자의 찜목록에 있는 요소들의 고유 식별번호입니다.
    

> Restaurant Schema
    
    _id : String
    사용자의 고유 식별번호 입니다.
    
    name : String
    음식점의 업소명 입니다.
    
    menu : Menu Object Array
    음식점의 메뉴 리스트입니다.
    
    category : String Array
    음식점의 카테고리 리스트입니다.
    
    address : String
    음식점의 주소입니다.
    
    reservation_max : Number
    음식점의 예약 최대 인원 수 입니다.
    
    reservation_current : Number
    음식점의 현재 예약 인원 수 입니다.
    
    phone : String
    음식점의 전화번호 입니다.
    
    reservation_cancel : Number
    음식점의 예약 취소 가능 시간입니다.
    
    reservation_check : Number
    음식점의 예약 가능 여부입니다.
        0 : 예약 가능
        1 : 모두 예약됨
        2 : 현재 예약을 받지 않음
    
    benefit : Object
    음식점의 예약 혜택입니다.
    
        main_benefit : String
        음식점의 메인 혜택입니다.
        
        sub_benefit : String
        음식점의 부가적인 혜택입니다.
        
        
    
    
> Menu Schema
    
    _id : String
    메뉴의 고유 식별번호 입니다.
    
    name : String
    메뉴의 이름입니다.
    
    price : Number
    메뉴의 가격입니다.
    

> Reservation Schema
    
    _id : String
    예약의 고유 식별번호 입니다.
    
    restaurant_name : String
    예약한 식당의 이름입니다.
    
    reservation_time : Date
    예약한 시간입니다.
    
    reservation_people : Number
    예약한 사람의 수입니다.
    
    reservation_payment : Number
    예약한 음식점에서 결제할 방식입니다.
    
        0 : 선금결제
        1 : 현장결제
        
    reservation_menu : Menu Object Array
    예약한 메뉴의 리스트입니다.
    
    reservation_price : Number
    예약한 메뉴의 총 금액입니다.
    
    reservation_code : String
    예약한 일정에 대한 확인 코드입니다.
    
    
    

## API Document

> /auth/facebook/token : 페이스북 로그인을 통해 얻은 토큰으로 로그인합니다. GET

>> Requiring Params

    access_token : 페이스북 access_token입니다.
    
>> Return Values
    
    HTTP Status 200, User Schema Without Password


> /auth/local/register : 로컬서버 Database를 통한 회원가입 API입니다. POST

>> Requiring Params

    name : 사용자의 이름입니다.
    phone : 사용자의 전화번호입니다.
    password : 사용자의 비밀번호입니다.
    password_chk : 사용자의 비밀번호 확인란의 값입니다.
    email : 사용자의 이메일입니다.
    
>> Return Values

    HTTP Status 200, User Schema Without Password

> /auth/local/authenticate : 로컬서버 Database를 통한 자동로그인 API입니다. POST

>> Requiring Params
    
    token : 사용자의 자동로그인 토큰입니다.
    
>> Return Values
    
    HTTP Status 200, User Schema Without Password

> /auth/local/login : 로컬서버 Database를 통한 로그인 API입니다. 초기 1회 이후는 /auth/local/authenticate를 이용해주세요. POST

>> Requiring Params

    email : 사용자의 회원가입시 입력했던 이메일 주소입니다.
    password : 사용자의 회원가입시 입력했던 비밀번호입니다.
    
>> Return Values

    >>> OnSuccess
    
        HTTP Status 200, User Schema Without Password
        
    >>> OnFailure
    
        HTTP Status 401