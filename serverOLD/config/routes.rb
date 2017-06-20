Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api do
    namespace :v1 do
      resources :spaces, except: [:new, :edit, :update]
      resources :nodes, except: [:index, :new, :edit, :update]
    end
  end

end
