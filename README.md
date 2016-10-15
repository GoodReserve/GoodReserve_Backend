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
    
    reservation_waiting : String Array
    사용자의 찜목록에 있는 요소들의 고유 식별번호입니다.
    
    user_type : Number
    사용자 계정의 유형입니다.
        
        0 : 일반 사용자
        1 : 업주
        
    user_restaurant : String
    업주일 경우 자신이 운영하는 업소에 해당하는 고유 식별번호입니다.
    

> Restaurant Schema
    
    _id : String
    사용자의 고유 식별번호 입니다.
    
    name : String
    음식점의 업소명 입니다.
    
    menu : Menu Object Array
    음식점의 메뉴 리스트입니다.
    
    thumbnail : String
    썸네일로 띄워질 이미지의 경로입니다.
    
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
    
    thumbnail : String
    썸네일로 띄워질 이미지의 경로입니다.
    
    restaurant : String
    메뉴가 제공되는 업소의 고유번호입니다.
    

> Reservation Schema
    
    _id : String
    예약의 고유 식별번호 입니다.
    
    restaurant_id : String
    예약한 식당의 고유 식별번호입니다.
    
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
        
    reservation_menu : String
    예약한 메뉴의 장바구니 고유 식별번호입니다.
    
    reservation_price : Number
    예약한 메뉴의 총 금액입니다.
    
    reservation_code : String
    예약한 일정에 대한 확인 코드입니다.
    
    cancel_type : Number
    취소된 예약일 경우 취소된 사유를 나타내는 코드입니다.
    
    reservation_status : Number
    예약의 현재 상태를 알려줍니다.
        
        0 : 아직 오지 않음
        1 : 예약 일정 완료
        2 : 예약 취소
    

> Bucket Schema

    _id : String
    장바구니의 고유 식별번호입니다.
    
    menus : String Array
    장바구니에 추가된 메뉴들의 고유 식별번호 배열입니다.
    
    
    

## API Document

> /auth/facebook/token : 페이스북 로그인을 통해 얻은 토큰으로 로그인합니다. GET

>> Requiring Params

    access_token : 페이스북 access_token입니다.
    
>> Return Values
    
    HTTP Status 200, User Schema Without Password

-----
> /auth/local/register : 로컬서버 Database를 통한 회원가입 API입니다. POST

>> Requiring Params

    name : 사용자의 이름입니다.
    phone : 사용자의 전화번호입니다.
    password : 사용자의 비밀번호입니다.
    password_chk : 사용자의 비밀번호 확인란의 값입니다.
    email : 사용자의 이메일입니다.
    user_type : 사용자 계정의 종류입니다. UserSchema를 참조해주세요.
    user_restaurant : 사용자가 업주일떄 자신의 음식점에 대한 고유 식별번호 입니다.
    
>> Return Values

    HTTP Status 200, User Schema Without Password
-----

> /auth/local/authenticate : 로컬서버 Database를 통한 자동로그인 API입니다. POST

>> Requiring Params
    
    token : 사용자의 자동로그인 토큰입니다.
    
>> Return Values
    
    HTTP Status 200, User Schema Without Password

-----
> /auth/local/login : 로컬서버 Database를 통한 로그인 API입니다. 초기 1회 이후는 /auth/local/authenticate를 이용해주세요. POST

>> Requiring Params

    email : 사용자의 회원가입시 입력했던 이메일 주소입니다.
    password : 사용자의 회원가입시 입력했던 비밀번호입니다.
    
>> Return Values

    >>> OnSuccess
    
        HTTP Status 200, User Schema Without Password
        
    >>> OnFailure
    
        HTTP Status 401
        
    >> Unvalid User Info
        
        HTTP Status 402
    
    >> Can't find User Info
    
        HTTP Status 403
        
-----
> /rest/add : 업소의 정보를 추가합니다. POST

>> Requiring Params

    name : 업소의 이름 입니다.
    menu : 음식점의 메뉴 리스트 입니다. 메뉴에 해당하는 id값만 배열형태로 저장합니다.
    category : 음식점의 카테고리 입니다. 테마별 검색기능 필터링 단어로 사용됩니다.
    address : 음식점의 주소 입니다.
    reservation_max : 음식점의 예약 가능 최대 인원 수 입니다.
    phone : 음식점의 전화번호 입니다.
    reservaton_cancel : 음식점의 예약 취소 가능 시간의 한도입니다. 분 단위로 입력받습니다. ex) 120
    main_benefit : 음식점의 주요 예약 혜택입니다.
    sub_benefit : 음식점의 부가적인 예약 혜택입니다.
    thumbnail : File 파라미터로 받습니다. 음식점의 썸네일로 보여질 파일입니다.
    
>> Return Values

    HTTP Status 200, Restaurant Schema
    
    -----
> /rest/search : 업소의 id값으로 업소의 정보를 조회합니다. POST

>> Requiring Params

    id : 업소의 고유 식별번호 입니다.
    
>> Return Values

    HTTP Status 200, Restaurant Schema

-----
> /menu/add : 업소에 해당하는 메뉴를 추가합니다. POST

>> Requiring Params

    name : 메뉴의 이름입니다.
    price : 메뉴의 가격입니다.
    restaurant : 메뉴가 제공되는 음식점의 고유 식별번호입니다.
    thumbnail : File 파라미터로 받습니다. 메뉴의 썸네일로 들어갈 파일입니다.
    
>> Return Values

    HTTP Status 200, Menu Schema
    
-----
> /menu/search : 메뉴의 id값으로 메뉴의 정보를 조회합니다. POST

>> Requiring Params

    id : 메뉴의 고유 식별번호입니다.
    
>> Return Values

    HTTP Status 200, Menu Schema
    
-----

> /menu/rest/list : 레스토랑의 id값으로 그 업소의 메뉴를 조회합니다. POST

>> Requiring Params

    restaurant_id : 업소의 고유 식별번호 입니다.
    
>> Return Values
    
    HTTP Status 200, Menu Object Array
    
-----

> /rest/search/tag : 쿼리로 레스토랑을 검색합니다. POST

>> Requiring Params

    query : 음식점을 검색하기 위한 쿼리입니다. 단어 단위의 배열로 입력받습니다.
    
>> Return Values
    
    HTTP Status 200, Restaurant Object Array
    
-----

> /rest/list : 업소의 리스트를 반환합니다. POST

>> Requiring Params

    None
    
>> Return Values

    HTTP Status 200, Restaurant Object Array
    
-----
> /resv/add : 새로운 예약을 생성합니다. POST

>> Requiring Params

    restaurant_id : 예약하는 식당의 고유 식별번호입니다.
    
    reservation_time : 예약한 시간입니다.
    
    reservation_people : 예약한 사람의 수입니다.
    
    reservation_payment : 예약한 음식점에서 결제할 방식입니다. 분류는 API문서를 참고해 주세요.
    
    reservation_menu : 예약한 메뉴의 리스트입니다.
    
    reservation_price : 예약한 메뉴의 총 금액입니다.
    
>> Return Values

    HTTP Status 200, Reservation Schema
    
    -----
> /resv/search : 예약의 고유 식별번호(_id)를 이용하여 예약 정보를 조회합니다. POST

>> Requiring Params

    id : 예약의 고유 식별번호 입니다.
    
>> Return Values

    HTTP Status 200, Reservation Schema
    
-----
> /resv/destroy : 예약이 완료되었을때, DB에 있는 예약의 현재 상태를 전환합니다. POST

>> Requiring Params

    id : 예약의 고유 식별번호 입니다.
    
>> Return Values

    HTTP Status 200, Reservation Schema
        
-----

> /resv/restaurant/search : 매장에 현재 문의되어있는 예약을 목록으로 보여줍니다.

>> Requiring Params

    restaurant_id : 예약이 걸린 음식점의 고유 식별번호 입니다.
    
>> Return Values

    HTTP Status 200, Reservation Schema Array
    
-----

> /resv/search/current : 현재 예약된 좌석의 수를 구해옵니다.

>> Requiring Params
    
    restaurant_id : 검색할 대상 음식점의 고유 식별번호 입니다.
    
>> Return Values

    HTTP Status 200, Number Of Current People
    
-----

> /resv/cancel : 예약을 취소합니다.

>> Requiring Params

    reservation_id : 취소할 대상 예약의 고유 식별번호 입니다.
    
    cancel_reason : 취소하는 사유에 대한 숫자 코드입니다.
    
    cancel_comment : cancel_reason이 3번 타입에 속할 경우, 특별한 취소 사유에 대한 파라미터입니다.
    
> /bucket/add : 장바구니를 생성하고, 메뉴를 추가합니다.

>> Requiring Params

    menus : 추가할 메뉴들의 배열입니다.
    
>> Return Values
    
    HTTP Status 200, Bucket Schema
    
-----


> /bucket/update : 장바구니의 메뉴를 수정합니다.

>> Requiring Params

    menus : 수정된 메뉴의 배열입니다.
    
    bucket_id : 수정할 대상이 되는 장바구니의 고유 식별번호입니다.
    
>> Return Values
    
    HTTP Status 200, Update Result
    
-----


> /bucket/info : 장바구니의 정보를 가져옵니다.

>> Requiring Params

    bucket_id : 정보를 가져올 대상 장바구니의 고유 식별번호입니다.
    
>> Return Values

    HTTP Status 200, Bucket Schema
    
------


> /bucket/destroy : 장바구니의 데이터를 파기합니다.

>> Requiring Params

    bucket_id : 정보를 파기할 대상 장바구니의 고유 식별번호입니다.
    
>> Return Values

    HTTP Staus 200, Bucket Schema
        