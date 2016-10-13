var menuCard= `
<div class="MenuCard">
  <div class="MenuImage left">
  <div class ="imageAddContainer valign-wrapper center-align">
    <a class="btn-floating valign btn-large waves-effect waves-light MainDarkRed"><i class="material-icons">add</i></a>
  </div>
  </div><!--
  --><div class="row MenuDetail right MainDarkRed-text">
    <div>
      <a class="right MainDarkRed-text" href="#!">
        <i class="material-icons">&#xE5CD;</i>								      </a>
    </div>										
      <div class="input-field col s12">
        <input type="text" id="menuName" placeholder=" "/>
	<label for="menuName">메뉴 이름</label>
      </div>
      <div class="input-field col s12">
        <input type="text" id="totalPrice" placeholder=" "/>	
	<label for="totalPrice">합계 금액</label>
      </div>
    </div>
</div>
`;

$(document).ready(function(){

$('.addCard').click(function(){
	$('.addCard').before(menuCard);
});

});
