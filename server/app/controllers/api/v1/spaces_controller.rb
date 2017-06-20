module Api
  module V1
    class SpacesController < ApplicationController

      def index
        render json: Space.all
      end

      def show
        render json: Space.find(params[:id])
      end

      def create
        space = Space.new(params.require(:space).permit(:title,:creator))
        if space.save
          render json: {message: "Created space!", status: 200}
        else
          render json: {message: space.errors.full_messages, status: 500}
        end
      end

    end
  end
end
