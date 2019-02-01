Rails.application.routes.draw do
  resources :sections
  get '/dashboard' => 'sections#index'

  post "/items" => 'sections#items'
  post '/delete' => 'sections#delete'
  post '/student' => 'sections#student'

  root 'sections#index'
end
