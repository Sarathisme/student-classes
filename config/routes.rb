# frozen_string_literal: true

Rails.application.routes.draw do
  resources :sections
  get '/dashboard' => 'sections#index'

  post '/items' => 'sections#items'
  post '/student' => 'sections#student'

  post '/classes/delete' => 'sections#delete_class'
  post '/classes/add' => 'sections#add_class'
  post '/classes/edit' => 'sections#edit_class'

  post '/students/add' => 'sections#add_student'
  post '/students/edit' => 'sections#edit_student'
  post '/students/delete' => 'sections#delete_student'

  root 'sections#index'
end
