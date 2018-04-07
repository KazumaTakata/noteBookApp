Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'home#index'
  get "/getinfo", to: "userinfos#get"
  post "/signup", to: "signups#new"
  post "/login", to: "signups#login"
  post "/classTable", to: "classtables#new"
  post "/addNote", to: "notelists#new"
  post "/addMarkDown", to: "noteedits#new"

end
