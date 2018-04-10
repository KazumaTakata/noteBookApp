class SignupsController < ApplicationController
  def new
    @user = User.create(email: params["email"], password: params["password"])
    if @user.errors.full_messages.length == 0
      render json: {id: @user.id}
    else
      render json: {error: @user.errors.full_messages}
    end
  end

  def login

    @user = User.find_by(email: params["email"])
    if  @user != nil
      if !!@user.authenticate(params["password"])
          render json: {id: @user.id}
      else
        render json: {error: "password is not correct"}
      end
    else
      render json: {error: "user does not exist"}
    end


  end

  def find
  end
end
