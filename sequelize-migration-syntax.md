

<!-- Everest -->
# User
sequelize model:generate --name User --attributes username:string,email:string,profile_picture:string,password:string,role:string,phone:string,emergency_contact:string,address:string,birth_date:string,academic_year:string,study_program:string,personal_number:string,destroyedAt:date

# Medical Record
sequelize model:generate --name Medical_Record --attributes user_id:string,height:integer,weight:string,atshma:boolean,heart_disease:boolean,specific_disease:boolean,specific_disease_description:string,allergy:boolean,allergy_description:string,surgery_history:boolean,surgery_history_description:string,destroyedAt:date

# Role
sequelize model:generate --name Role --attributes organization_id:string,name:string,destroyedAt:date

# Permission
sequelize model:generate --name Permission --attributes service_name:string,service_description:string,restricted:boolean,destroyedAt:date

# Role_Permision
sequelize model:generate --name Role_Permision --attributes role_id:string,permision_id:string,destroyedAt:date

 <!-- Denali -->
# Organization
sequelize model:generate --name Organization --attributes name:string,destroyedAt:date

# User_Organization
sequelize model:generate --name User_Organization --attributes organization_id:string,user_id:string,destroyedAt:date

# Project
sequelize model:generate --name Project --attributes organization_id:string,name:string,description:string,start_date:date,end_date:date,type:string,is_public:boolean,status:string,recap:string,destroyedAt:date

# User_Project
sequelize model:generate --name User_Project --attributes user_id:string,project_id:string,destroyedAt:date

# Task
sequelize model:generate --name Task --attributes pic:string,project_id:string,title:string,description:string,start_date:date,end_date:date,status:string,notes:string,destroyedAt:date

# Recruitment
sequelize model:generate --name Recruitment --attributes organization_id:string,first_name:string,last_name:string,nickname:string,birth_date:date,email:string,phone:string,medical_history:string,reason:string,experience:string,picture:string,destroyedAt:string

# Announcement
sequelize model:generate --name Announcement --attributes title:string,description:string,organization_id:string,destroyedAt:date

# Log
sequelize model:generate --name Log --attributes service_name:string,status:string,request:string,response:string,destroyedAt:date

<!-- aconcagua -->
# Article
sequelize model:generate --name Article --attributes organization_id:string,title:string,description:string,body:string,author:string,category:string,posted_by:string,destroyedAt:date

<!-- eiger -->
# Storage
sequelize model:generate --name Storage --attributes organization_id:string,file:string,type:string,posted_by:string,destroyedAt:date
