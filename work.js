		$('#statusBar').hide();
		Bmob.initialize("968ee2c53073efada1055d4f19a04e90", "7a72ab30cd2765ed44d33482b80fc70a");
		$(function () { $('#myModal').modal({
			keyboard: true
		})});
		$(document).ready(function(){
			$("#Request").click(function(){
				$('#requestModel').modal('show');
				$("#questNumber").val($("#Number").val());
			});
			$("#requestBut").click(function(){
				//alert(123);
				$('#statusBar').hide();
				var questNumber = $("#questNumber").val();
				var Student = Bmob.Object.extend("Student");
				var query = new Bmob.Query(Student);
				query.equalTo("stuNumber",questNumber);

					query.find({
	                success: function(results) {
	                	if (results.length==0) {
	                		$('#statusBar').html("<p id=\"statusBar\">当前用户<strong>不存在</strong>！</p>");
	                		$("#statusBar").fadeIn();
	                		//break;
	                		return;
                		}
                		else {
                			var objectfid = results[0];
                			var queryDetails = new Bmob.Query(Student);
                			queryDetails.get(objectfid.id, {
							      success: function(object) {
							        // The object was retrieved successfully.
							        var Flag = object.get("Submit");
							        if(Flag) {
							        	$('#statusBar').html("<p id=\"statusBar\">后台菌检索到了您的提交记录： <br>"+"ZJUid: <kbd>"+object.get("stuNumber")+"</kbd><br>"+"稿件名： <kbd>"+object.get("Title")+"</kbd></p>");
							        }
							        else {
							        	$('#statusBar').html("<p id=\"statusBar\">后台菌并未检索到您的提交记录~</p>");
							        }
							         $("#statusBar").fadeIn();
							        //alert(object.get("stuNumber")+" "+object.get("Title"));
							      },
							      error: function(object, error) {
							        alert("查找对象错误！");
							      }
                			});
                		}          	
	                },
	                error: function(error) {
	                    alert("查找ZJUid错误！");
	                }
	            });



			});			
			$("form").submit(function(e){
				$('#submitBut').attr("disabled",true); 
				$('#submitBut').attr("value","正在提交中..."); 
				e.preventDefault();
				//Get Data
				var stuNumber = $("#Number").val();
				var artiType = $("#Type").val();
				var Title = $("#Title").val();
				//alert(Title);
				
				//Submit data
				var Student = Bmob.Object.extend("Student");
				//var myStudent = new Student();

				var query = new Bmob.Query(Student);
				query.equalTo("stuNumber",stuNumber);
				var unexist = false;

	            query.find({
	                success: function(results) {
	                	if (results.length==0) {
	                		unexist=true;
	                		alert("当前用户不存在！");
	                		//break;
	                		return;
	                	}
                        var objectfi = results[0];
                        //alert(objectfi.id);
                        objID = objectfi.id;
                        //Set status to be true
                        var queryStatus = new Bmob.Query(Student);
					    queryStatus.get(objectfi.id, {
					      success: function(object) {
					        // The object was retrieved successfully.
					        object.set("Submit", true);
					        object.save(null, {
					          success: function(objectUpdate) {
								//Submit the file
				    			var fileUploadControl = $("#profilePhotoFileUpload")[0];
						        if (fileUploadControl.files.length > 0) {
							        var bytes = fileUploadControl.files[0];
							        //alert(getFileExt(fileUploadControl));
							        var name = artiType+" 一团十四连投稿 "+Title+".docx";
							        var file = new Bmob.File(name, bytes);
							        file.save().then(function(obj) {
									  
									  //Update fileURL && Title
									  //alert(objID);
									  //alert(obj.url());
									  var queryFile = new Bmob.Query(Student);
									  	queryFile.get(objID, {
									      success: function(object) {
									        // The object was retrieved successfully.
									        object.set("fileURL", obj.url());
									        object.set("Title", name);
									        object.save(null, {
									          success: function(objectUpdate) {
									            //alert("create object success "+objectUpdate.get("Submit"));
									          },
									          error: function(model, error) {
									            alert("更新File错误！");
									          }
									        });
									      },
									      error: function(object, error) {
									        alert("查找File错误！");
									      }
									    });	
									    $('#SubmitModel').modal('show');
									    $('#submitBut').attr("disabled",false); 
									    $('#submitBut').attr("value","提交");	  
									  	//alert("提交成功！");
									  //$("#Dial").slideDown("slow");
									}, function(error) {
									  alert("文件提交出现错误！");
									});
						    	}					          	
					            //alert("create object success "+objectUpdate.get("Submit"));
					          },
					          error: function(model, error) {
					            alert("更新Status错误！");
					          }
					        });
					      },
					      error: function(object, error) {
					        alert("查找Status错误！");
					      }
					    });
	                },
	                error: function(error) {
	                    alert("查找ZJUid错误！");
	                }
	            });
  			});
		});