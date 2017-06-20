module Api
  module V1
    class SpacesController < ApplicationController

      def index
        render json: Space.all
      end

      def create
        space = Space.new(params.require(:space).permit(:title,:creator))
        if space.save
          render json: {
            message: "Successfully created space!",
            status: 200,
            data: Space.last
          }
        else
          render json: {message: space.errors.full_messages, status: 500}
        end
      end

      def show
        render json: Space.find(params[:id])
      end

      def destroy
        Space.find(params[:id]).destroy
        render json: {message: "Successfully deleted space!", status: 200}
      end

    end
  end
end
